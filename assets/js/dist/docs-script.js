"use strict";
(() => {
  // src/load.ts
  function load(readMethod) {
    readMethod = readMethod ?? "text" /* Text */;
    return new Promise((resolve, reject) => {
      function fileLoaded(e) {
        const reader = this;
        if (reader.readyState === FileReader.DONE) {
          if (reader.result) {
            resolve(reader.result);
          } else {
            if (reader.error) {
              reject(reader.error);
            } else {
              reject(new DOMException("Error parsing file"));
            }
          }
        }
      }
      function readFile(file) {
        const reader = new FileReader();
        reader.addEventListener("load", fileLoaded);
        reader.addEventListener("error", () => {
          reader.abort();
          if (reader.error) {
            reject(reader.error);
          } else {
            reject(new DOMException("Error parsing file"));
          }
        });
        switch (readMethod) {
          case "arrayBuffer" /* ArrayBuffer */:
            reader.readAsArrayBuffer(file);
            break;
          case "binaryString" /* BinaryString */:
            reader.readAsBinaryString(file);
            break;
          case "dataUrl" /* DataUrl */:
            reader.readAsDataURL(file);
            break;
          case "text" /* Text */:
            reader.readAsText(file);
            break;
          default:
            reject(new RangeError(`FileIO: Unrecognised readMethod ${readMethod}`));
            break;
        }
      }
      if ("showOpenFilePicker" in window) {
        window.showOpenFilePicker().then(async ([handle]) => {
          if (handle.kind === "file") {
            const file = await handle.getFile();
            if (readMethod === "file" /* File */) {
              resolve(file);
            } else {
              readFile(file);
            }
          } else {
            reject();
          }
        }).catch(reject);
        return;
      }
      function loadSelectedFileEvent(e) {
        const $fileInput2 = this;
        const files = $fileInput2.files;
        if (files && files.length > 0) {
          const file = files[0];
          if (readMethod === "file" /* File */) {
            resolve(file);
          } else {
            readFile(file);
          }
        }
      }
      const $fileInput = document.createElement("input");
      $fileInput.type = "file";
      $fileInput.addEventListener("change", loadSelectedFileEvent);
      $fileInput.click();
    });
  }

  // node_modules/@cipscis/csv/dist/csv.js
  function stringify(data, options) {
    options = options || {};
    options.transpose = options.transpose || false;
    options.sanitise = options.sanitise || false;
    const rows = data;
    const shapedRows = _shape(data, options);
    const escapedRows = _escape(shapedRows, options);
    const joinedRows = _join(escapedRows);
    return joinedRows;
  }
  function _shape(data, options) {
    const transpose = options?.transpose ?? false;
    const maxLength = data.reduce((maxLength2, row) => Math.max(maxLength2, row.length), 0);
    const iMax = transpose ? maxLength : data.length;
    const jMax = transpose ? data.length : maxLength;
    const rows = [];
    for (let i = 0; i < iMax; i++) {
      const row = [];
      for (let j = 0; j < jMax; j++) {
        const iRow = transpose ? j : i;
        const iCol = transpose ? i : j;
        let cellValue = data[iRow][iCol];
        if (iCol >= data[iRow].length) {
          cellValue = "";
        }
        row.push(cellValue);
      }
      rows.push(row);
    }
    return rows;
  }
  function _escape(rows, options) {
    for (const row of rows) {
      for (let j = 0; j < row.length; j++) {
        row[j] = _escapeCell(row[j], options);
      }
    }
    return rows;
  }
  function _escapeCell(cell, options) {
    const sanitise = options?.sanitise ?? false;
    let cellString;
    if (typeof cell === "undefined") {
      cellString = "";
    } else if (typeof cell !== "string") {
      cellString = "" + cell;
    } else {
      cellString = cell;
    }
    if (sanitise) {
      if (cellString.match(/^[=\-+@]/)) {
        cellString = "	" + cell;
      }
    }
    if (cellString.match(/,|"|\n/)) {
      cellString = cellString.replace(/"/g, '""');
      cellString = '"' + cellString + '"';
    }
    return cellString;
  }
  function _join(rows) {
    const rowStrings = [];
    for (let i = 0; i < rows.length; i++) {
      rowStrings.push(rows[i].join(","));
    }
    const rowsString = rowStrings.join("\n");
    return rowsString;
  }

  // src/save.ts
  var $link;
  function save(data, options) {
    if (data instanceof File) {
      _saveFile(data, options);
    } else if (data instanceof Blob) {
      _saveBlob(data, options);
    } else {
      _saveData(data, options);
    }
  }
  function _saveBlob(blob, options) {
    if (!(blob instanceof Blob)) {
      throw new TypeError("FileIO: save blob requires a Blob");
    }
    const filename = options?.filename || "file";
    if (options?.saveAs && "showSaveFilePicker" in window) {
      showSaveFilePicker({
        suggestedName: filename
      }).then(async (handle) => {
        const writeableStream = await handle.createWritable();
        await writeableStream.write(blob);
        await writeableStream.close();
      }).catch(() => {
      });
    } else if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      const url = URL.createObjectURL(blob);
      _downloadDataUrl(url, filename);
    }
  }
  function _saveFile(file, options) {
    if (!(file instanceof File)) {
      throw new TypeError("FileIO: save file requires a File");
    }
    const filename = options?.filename || file.name || "file";
    if (options?.saveAs && "showSaveFilePicker" in window) {
      showSaveFilePicker({
        suggestedName: filename
      }).then(async (handle) => {
        const writeableStream = await handle.createWritable();
        await writeableStream.write(file);
        await writeableStream.close();
      }).catch(() => {
      });
    } else if (navigator.msSaveBlob) {
      navigator.msSaveBlob(file, filename);
    } else {
      const reader = new FileReader();
      reader.addEventListener("load", function() {
        if (reader.readyState === FileReader.DONE) {
          if (reader.result) {
            const result = reader.result;
            _downloadDataUrl(result, filename);
          } else {
            if (reader.error) {
              throw reader.error;
            } else {
              throw new DOMException("Error parsing file");
            }
          }
        }
      });
      reader.addEventListener("error", () => {
        reader.abort();
        if (reader.error) {
          throw reader.error;
        } else {
          throw new DOMException("Error parsing file");
        }
      });
      reader.readAsDataURL(file);
    }
  }
  function _saveData(data, options) {
    options = options ?? {};
    if (!options.filename) {
      options.filename = "file";
    }
    let type = options?.type || "text/plain";
    switch (type) {
      case "json":
        type = "application/json";
        break;
      case "csv":
        type = "text/csv";
        break;
    }
    if (type === "application/json") {
      data = JSON.stringify(data);
      options.filename = _extendFilename(options.filename, "json");
    } else if (type === "text/csv") {
      if (Array.isArray(data) && data.every(Array.isArray)) {
        data = stringify(data, options);
      }
      options.filename = _extendFilename(options.filename, "csv");
    }
    try {
      const blob = new Blob(
        // This type assertion is *not* safe, but if an error is thrown it will be handled
        [data],
        { type }
      );
      _saveBlob(blob, options);
    } catch (e) {
      throw new TypeError("Could not save data due to unsupported type");
    }
  }
  function _downloadDataUrl(dataUrl, filename) {
    $link = $link || document.createElement("a");
    $link.href = dataUrl;
    $link.download = filename;
    $link.click();
    URL.revokeObjectURL(dataUrl);
  }
  function _extendFilename(filename, extension) {
    const testPattern = new RegExp("\\." + extension + "$");
    if (!testPattern.test(filename)) {
      filename += "." + extension;
    }
    return filename;
  }

  // docs/assets/js/src/docs-script.ts
  var saveAs = false;
  var toggleSaveAs = () => {
    saveAs = !saveAs;
    const $saveAsValue = document.querySelector(".js-save-as-value");
    if ($saveAsValue) {
      $saveAsValue.innerText = saveAs.toString();
    }
  };
  document.querySelectorAll(".js-save-as-toggle").forEach(($el) => $el.addEventListener("click", toggleSaveAs));
  var loadImage = (fileUrl) => {
    const $image = document.querySelectorAll(".js-fileio-image");
    $image.forEach(($image2) => $image2.src = fileUrl);
  };
  document.querySelectorAll(".js-load-image").forEach(($el) => $el.addEventListener("click", () => {
    load("dataUrl" /* DataUrl */).then(loadImage);
  }));
  var saveData = () => {
    const data = "Hey look, the file has some content!";
    const filename = "test file.txt";
    const type = "text/plain";
    save(data, { filename, type, saveAs });
  };
  document.querySelectorAll(".js-save-data").forEach(($el) => $el.addEventListener("click", saveData));
  var saveJson = () => {
    const data = {
      text: 1,
      foo: "bar"
    };
    const filename = "test json";
    save(data, { filename, type: "json", saveAs });
  };
  document.querySelectorAll(".js-save-json").forEach(($el) => $el.addEventListener("click", saveJson));
  var saveCsv = () => {
    const data = [
      ["even numbers", 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
      ["odd numbers", 1, 3, 5, 7, 9],
      ["prime numbers, up to ten", 2, 3, 5, 7]
    ];
    const filename = "test csv";
    save(data, { filename, type: "csv", saveAs, transpose: true });
  };
  document.querySelectorAll(".js-save-csv").forEach(($el) => $el.addEventListener("click", saveCsv));
  var saveFile = async () => {
    const file = await load("file" /* File */);
    save(file, { saveAs });
  };
  document.querySelectorAll(".js-save-file").forEach(($el) => $el.addEventListener("click", saveFile));
})();
