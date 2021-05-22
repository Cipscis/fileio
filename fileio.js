/* FileIO 1.0.0 */

let $link;

const fileIO = {
	load: (options) => {
		options = options || {};
		options.readMethod = options.readMethod || 'text';

		return new Promise((resolve, reject) => {
			const fileLoaded = (e) => {
				let reader = e.target;

				if (reader.readyState === 2) {
					// DONE
					resolve(reader.result);
				}
			};

			const readFile = (file) => {
				let reader = new FileReader();

				reader.addEventListener('load', fileLoaded);
				reader.addEventListener('error', () => {
					reader.abort();
					reject(new DOMException('Error parsing file'));
				});

				switch (options.readMethod) {
					case 'arrayBuffer':
						reader.readAsArrayBuffer(file);
						break;
					case 'binaryString':
						reader.readAsBinaryString(file);
						break;
					case 'dataUrl':
						reader.readAsDataURL(file);
						break;
					case 'text':
						reader.readAsText(file);
						break;
					default:
						throw new RangeError(`FileIO: Unrecognised readMethod ${options.readMethod}`);
						break;
				}
			};

			const loadSelectedFile = (file) => {
				if (options.readMethod === 'file') {
					resolve(file);
				} else {
					readFile(file);
				}
			};

			const loadSelectedFileEvent = (e) => {
				let $fileInput = e.target;
				let file = $fileInput.files[0];

				if (file) {
					loadSelectedFile(file);
				}
			};

			const $fileInput = document.createElement('input');
			$fileInput.type = 'file';
			$fileInput.addEventListener('change', loadSelectedFileEvent);

			$fileInput.click();
		});
	},

	save: (data, options) => {
		options = options || {};

		if (data instanceof File) {
			fileIO._saveFile(data, options);
		} else if (data instanceof Blob) {
			fileIO._saveBlob(data, options);
		} else {
			fileIO._saveData(data, options);
		}
	},

	_saveBlob: (blob, options) => {
		if (!(blob instanceof Blob)) {
			throw new TypeError('FileIO: save blob requires a Blob');
		}

		options.filename = options.filename || 'file';

		if (navigator.msSaveBlob) {
			navigator.msSaveBlob(blob, filename);
		} else {
			let url = URL.createObjectURL(blob);
			fileIO._downloadDataUrl(url, options.filename);
		}
	},

	_saveFile: (file, options) => {
		if (!(file instanceof File)) {
			throw new TypeError('FileIO: save file requires a File');
		}

		options.filename = options.filename || file.name || 'file';

		if (navigator.msSaveBlob) {
			navigator.msSaveBlob(file, options.filename);
		} else {
			let reader = new FileReader();

			reader.readAsDataURL(file);
			reader.addEventListener('load', function () {
				fileIO._downloadDataUrl(this.result, options.filename);
			});
		}
	},

	_saveData: function (data, options) {
		options.filename = options.filename || 'file';
		options.type = options.type || 'text/plain'

		// CSV only
		options.transpose = options.transpose || false;
		options.sanitise = options.sanitise || false;

		// Type shorthands
		switch (options.type) {
			case 'json':
				options.type = 'application/json';
				break;
			case 'csv':
				options.type = 'text/csv';
				break;
		}

		if (options.type === 'application/json') {
			try {
				data = JSON.stringify(data);
			} catch (e) {
				console.error('FileIO: Failed to save JSON');
				console.error(e);
			}

			options.filename = fileIO._extendFilename(options.filename, 'json');
		} else if (options.type === 'text/csv') {
			data = fileIO._csvPrepareData(data, options);
			options.filename = fileIO._extendFilename(options.filename, 'csv');
		}

		// Construct a Blob and download it
		let blob = new Blob(
			[data],
			{ type: options.type }
		);

		fileIO._saveBlob(blob, options);
	},

	_downloadDataUrl: function (dataUrl, filename) {
		$link = $link || document.createElement('a');
		$link.href = dataUrl;
		$link.download = filename;
		$link.click();

		URL.revokeObjectURL(dataUrl);
	},

	_csvPrepareData: function (data, options) {
		// Enforce square data and apply CSV escaping, then convert to string
		let rows = data;

		rows = fileIO._csvShapeData(data, options);
		rows = fileIO._csvEscape(rows, options);

		rows = fileIO._csvStringify(rows);

		return rows;
	},

	_csvStringify: function (rows) {
		for (let i = 0; i < rows.length; i++) {
			rows[i] = rows[i].join(',');
		}
		rows = rows.join('\n');

		return rows;
	},

	_csvShapeData: function (data, options) {
		// Pad empty cells with empty strings and,
		// if necessary, transpose the data

		const transpose = options.transpose;

		const maxLength = data.reduce((maxLength, row) => Math.max(maxLength, row.length), 0);

		// Flip rows and columns if transposing data
		const iMax = transpose ? maxLength : data.length;
		const jMax = transpose ? data.length : maxLength;

		let rows = [];
		for (let i = 0; i < iMax; i++) {
			let row = [];
			for (let j = 0; j < jMax; j++) {
				let cellValue = transpose ? data[j][i] : data[i][j];

				if (typeof cellValue === 'undefined') {
					cellValue = '';
				}

				row.push(cellValue);
			}
			rows.push(row);
		}

		return rows;
	},

	_csvEscape: function (rows, options) {
		// Make sure any cells containing " or , or a newline are escaped appropriately

		const sanitise = options.sanitise;

		for (let i = 0; i < rows.length; i++) {
			let row = rows[i];

			for (let j = 0; j < row.length; j++) {
				if (typeof row[j] === 'undefined') {
					row[j] = '';
				} else if (typeof row[j] !== 'string') {
					// Convert to string
					row[j] = '' + row[j];
				}

				if (sanitise) {
					// Prevent spreadsheet software like
					// Excel from trying to execute code
					if (row[j].match(/^[=\-+@]/)) {
						row[j] = '\t' + row[j];
					}
				}

				if (row[j].match(/,|"|\n/)) {

					// Turn any double quotes into escaped double quotes
					row[j] = row[j].replace(/"/g, '""');

					// Wrap cell in double quotes
					row[j] = '"' + row[j] + '"';
				}
			}
		}

		return rows;
	},

	_downloadDataUrl: function (dataUrl, filename) {
		$link = $link || document.createElement('a');
		$link.href = dataUrl;
		$link.download = filename;
		$link.click();

		URL.revokeObjectURL(dataUrl);
	},

	_extendFilename: function (filename, extension) {
		let testPattern = new RegExp('\\.' + extension + '$');

		if (!testPattern.test(filename)) {
			filename += '.' + extension;
		}

		return filename;
	},
};

export const save = fileIO.save;
export const load = fileIO.load;

export default fileIO;
