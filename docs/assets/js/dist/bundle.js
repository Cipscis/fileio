/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./docs/assets/js/src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./docs/assets/js/src/main.js":
/*!************************************!*\
  !*** ./docs/assets/js/src/main.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fileio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! /fileio */ \"./fileio.js\");\n/* harmony import */ var activate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! activate */ \"./node_modules/activate/activate.js\");\n\r\n\r\n\r\nconst loadImage = (fileUrl) => {\r\n\tlet $image = document.querySelectorAll('.js-fileio-image');\r\n\t$image.forEach(($image) => $image.src = fileUrl);\r\n};\r\nObject(activate__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('.js-load-image', () => {\r\n\t_fileio__WEBPACK_IMPORTED_MODULE_0__[\"default\"].load({ readMethod: 'dataUrl' }).then(loadImage);\r\n});\r\n\r\nconst saveData = () => {\r\n\tlet data = 'Hey look, the file has some content!';\r\n\tlet filename = 'test file.txt';\r\n\tlet type = 'text/plain';\r\n\r\n\t_fileio__WEBPACK_IMPORTED_MODULE_0__[\"default\"].save(data, { filename, type });\r\n};\r\nObject(activate__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('.js-save-data', saveData);\r\n\r\nconst saveJson = () => {\r\n\tlet data = {\r\n\t\ttext: 1,\r\n\t\tfoo: 'bar'\r\n\t};\r\n\tlet filename = 'test json';\r\n\r\n\t_fileio__WEBPACK_IMPORTED_MODULE_0__[\"default\"].save(data, { filename, type: 'json' });\r\n};\r\nObject(activate__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('.js-save-json', saveJson);\r\n\r\nconst saveCsv = () => {\r\n\tlet data = [\r\n\t\t['even numbers', 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],\r\n\t\t['odd numbers', 1, 3, 5, 7, 9],\r\n\t\t['prime numbers, up to ten', 2, 3, 5, 7]\r\n\t];\r\n\tlet filename = 'test csv';\r\n\r\n\t_fileio__WEBPACK_IMPORTED_MODULE_0__[\"default\"].save(data, {filename, type: 'csv', transpose: true });\r\n};\r\nObject(activate__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('.js-save-csv', saveCsv);\r\n\r\nconst saveFile = async () => {\r\n\tconst file = await _fileio__WEBPACK_IMPORTED_MODULE_0__[\"default\"].load({ readMethod: 'file' });\r\n\t_fileio__WEBPACK_IMPORTED_MODULE_0__[\"default\"].save(file);\r\n};\r\nObject(activate__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('.js-save-file', saveFile);\r\n\n\n//# sourceURL=webpack:///./docs/assets/js/src/main.js?");

/***/ }),

/***/ "./fileio.js":
/*!*******************!*\
  !*** ./fileio.js ***!
  \*******************/
/*! exports provided: save, load, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"save\", function() { return save; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"load\", function() { return load; });\n/* harmony import */ var csv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! csv */ \"./node_modules/csv/csv.js\");\n\r\n\r\nlet $link;\r\n\r\nconst fileIO = {\r\n\tload: (options) => {\r\n\t\toptions = options || {};\r\n\t\toptions.readMethod = options.readMethod || 'text';\r\n\r\n\t\treturn new Promise((resolve, reject) => {\r\n\t\t\tconst fileLoaded = (e) => {\r\n\t\t\t\tlet reader = e.target;\r\n\r\n\t\t\t\tif (reader.readyState === 2) {\r\n\t\t\t\t\t// DONE\r\n\t\t\t\t\tresolve(reader.result);\r\n\t\t\t\t}\r\n\t\t\t};\r\n\r\n\t\t\tconst readFile = (file) => {\r\n\t\t\t\tlet reader = new FileReader();\r\n\r\n\t\t\t\treader.addEventListener('load', fileLoaded);\r\n\t\t\t\treader.addEventListener('error', () => {\r\n\t\t\t\t\treader.abort();\r\n\t\t\t\t\treject(new DOMException('Error parsing file'));\r\n\t\t\t\t});\r\n\r\n\t\t\t\tswitch (options.readMethod) {\r\n\t\t\t\t\tcase 'arrayBuffer':\r\n\t\t\t\t\t\treader.readAsArrayBuffer(file);\r\n\t\t\t\t\t\tbreak;\r\n\t\t\t\t\tcase 'binaryString':\r\n\t\t\t\t\t\treader.readAsBinaryString(file);\r\n\t\t\t\t\t\tbreak;\r\n\t\t\t\t\tcase 'dataUrl':\r\n\t\t\t\t\t\treader.readAsDataURL(file);\r\n\t\t\t\t\t\tbreak;\r\n\t\t\t\t\tcase 'text':\r\n\t\t\t\t\t\treader.readAsText(file);\r\n\t\t\t\t\t\tbreak;\r\n\t\t\t\t\tdefault:\r\n\t\t\t\t\t\tthrow new RangeError(`FileIO: Unrecognised readMethod ${options.readMethod}`);\r\n\t\t\t\t\t\tbreak;\r\n\t\t\t\t}\r\n\t\t\t};\r\n\r\n\t\t\tconst loadSelectedFile = (file) => {\r\n\t\t\t\tif (options.readMethod === 'file') {\r\n\t\t\t\t\tresolve(file);\r\n\t\t\t\t} else {\r\n\t\t\t\t\treadFile(file);\r\n\t\t\t\t}\r\n\t\t\t};\r\n\r\n\t\t\tconst loadSelectedFileEvent = (e) => {\r\n\t\t\t\tlet $fileInput = e.target;\r\n\t\t\t\tlet file = $fileInput.files[0];\r\n\r\n\t\t\t\tif (file) {\r\n\t\t\t\t\tloadSelectedFile(file);\r\n\t\t\t\t}\r\n\t\t\t};\r\n\r\n\t\t\tconst $fileInput = document.createElement('input');\r\n\t\t\t$fileInput.type = 'file';\r\n\t\t\t$fileInput.addEventListener('change', loadSelectedFileEvent);\r\n\r\n\t\t\t$fileInput.click();\r\n\t\t});\r\n\t},\r\n\r\n\tsave: (data, options) => {\r\n\t\toptions = options || {};\r\n\r\n\t\tif (data instanceof File) {\r\n\t\t\tfileIO._saveFile(data, options);\r\n\t\t} else if (data instanceof Blob) {\r\n\t\t\tfileIO._saveBlob(data, options);\r\n\t\t} else {\r\n\t\t\tfileIO._saveData(data, options);\r\n\t\t}\r\n\t},\r\n\r\n\t_saveBlob: (blob, options) => {\r\n\t\tif (!(blob instanceof Blob)) {\r\n\t\t\tthrow new TypeError('FileIO: save blob requires a Blob');\r\n\t\t}\r\n\r\n\t\toptions.filename = options.filename || 'file';\r\n\r\n\t\tif (navigator.msSaveBlob) {\r\n\t\t\tnavigator.msSaveBlob(blob, filename);\r\n\t\t} else {\r\n\t\t\tlet url = URL.createObjectURL(blob);\r\n\t\t\tfileIO._downloadDataUrl(url, options.filename);\r\n\t\t}\r\n\t},\r\n\r\n\t_saveFile: (file, options) => {\r\n\t\tif (!(file instanceof File)) {\r\n\t\t\tthrow new TypeError('FileIO: save file requires a File');\r\n\t\t}\r\n\r\n\t\toptions.filename = options.filename || file.name || 'file';\r\n\r\n\t\tif (navigator.msSaveBlob) {\r\n\t\t\tnavigator.msSaveBlob(file, options.filename);\r\n\t\t} else {\r\n\t\t\tlet reader = new FileReader();\r\n\r\n\t\t\treader.readAsDataURL(file);\r\n\t\t\treader.addEventListener('load', function () {\r\n\t\t\t\tfileIO._downloadDataUrl(this.result, options.filename);\r\n\t\t\t});\r\n\t\t}\r\n\t},\r\n\r\n\t_saveData: function (data, options) {\r\n\t\toptions.filename = options.filename || 'file';\r\n\t\toptions.type = options.type || 'text/plain'\r\n\r\n\t\t// CSV only\r\n\t\toptions.transpose = options.transpose || false;\r\n\t\toptions.sanitise = options.sanitise || false;\r\n\r\n\t\t// Type shorthands\r\n\t\tswitch (options.type) {\r\n\t\t\tcase 'json':\r\n\t\t\t\toptions.type = 'application/json';\r\n\t\t\t\tbreak;\r\n\t\t\tcase 'csv':\r\n\t\t\t\toptions.type = 'text/csv';\r\n\t\t\t\tbreak;\r\n\t\t}\r\n\r\n\t\tif (options.type === 'application/json') {\r\n\t\t\ttry {\r\n\t\t\t\tdata = JSON.stringify(data);\r\n\t\t\t} catch (e) {\r\n\t\t\t\tconsole.error('FileIO: Failed to save JSON');\r\n\t\t\t\tconsole.error(e);\r\n\t\t\t}\r\n\r\n\t\t\toptions.filename = fileIO._extendFilename(options.filename, 'json');\r\n\t\t} else if (options.type === 'text/csv') {\r\n\t\t\tif (!(typeof data === 'string' || data instanceof String)) {\r\n\t\t\t\tdata = csv__WEBPACK_IMPORTED_MODULE_0__[\"stringify\"](data, options);\r\n\t\t\t}\r\n\t\t\toptions.filename = fileIO._extendFilename(options.filename, 'csv');\r\n\t\t}\r\n\r\n\t\t// Construct a Blob and download it\r\n\t\tlet blob = new Blob(\r\n\t\t\t[data],\r\n\t\t\t{ type: options.type }\r\n\t\t);\r\n\r\n\t\tfileIO._saveBlob(blob, options);\r\n\t},\r\n\r\n\t_downloadDataUrl: function (dataUrl, filename) {\r\n\t\t$link = $link || document.createElement('a');\r\n\t\t$link.href = dataUrl;\r\n\t\t$link.download = filename;\r\n\t\t$link.click();\r\n\r\n\t\tURL.revokeObjectURL(dataUrl);\r\n\t},\r\n\r\n\t_downloadDataUrl: function (dataUrl, filename) {\r\n\t\t$link = $link || document.createElement('a');\r\n\t\t$link.href = dataUrl;\r\n\t\t$link.download = filename;\r\n\t\t$link.click();\r\n\r\n\t\tURL.revokeObjectURL(dataUrl);\r\n\t},\r\n\r\n\t_extendFilename: function (filename, extension) {\r\n\t\tlet testPattern = new RegExp('\\\\.' + extension + '$');\r\n\r\n\t\tif (!testPattern.test(filename)) {\r\n\t\t\tfilename += '.' + extension;\r\n\t\t}\r\n\r\n\t\treturn filename;\r\n\t},\r\n};\r\n\r\nconst save = fileIO.save;\r\nconst load = fileIO.load;\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (fileIO);\r\n\n\n//# sourceURL=webpack:///./fileio.js?");

/***/ }),

/***/ "./node_modules/activate/activate.js":
/*!*******************************************!*\
  !*** ./node_modules/activate/activate.js ***!
  \*******************************************/
/*! exports provided: activate, deactivate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"activate\", function() { return activate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deactivate\", function() { return deactivate; });\n/* Activate 1.0.2 */\n\n// Binds event listeners to one or more elements that makes them behave\n// like buttons, detecting both \"click\" events and also keydown for\n// the \"Enter\" key and keyup for the \"Space\" key.\n\n// Example usage:\n// activate(nodeList, fn);\n// activate(singleNode, fn);\n// activate(selector, fn);\n\nconst boundEvents = [];\n/*\n[\n\t{\n\t\tnode: Node,\n\t\tbindings: [\n\t\t\t{\n\t\t\t\tfn: Function,\n\t\t\t\tspacebarFn: Function,\n\t\t\t\tenterFn: Function\n\t\t\t}\n\t\t]\n\t}\n]\n*/\n\nconst { activate, deactivate } = (function () {\n\tconst module = {\n\t\tactivate: function (nodes, fn) {\n\t\t\tmodule._activator(nodes, fn, module._activateSingle);\n\t\t},\n\n\t\tdeactivate: function (nodes, fn) {\n\t\t\tmodule._activator(nodes, fn, module._deactivateSingle);\n\t\t},\n\n\t\t_activator: function (nodes, fn, activator) {\n\t\t\t// Share the same initial logic between activate and deactivate,\n\t\t\t// but run a different function over each node\n\n\t\t\tif (typeof nodes === 'string') {\n\t\t\t\ttry {\n\t\t\t\t\tnodes = document.querySelectorAll(nodes);\n\t\t\t\t} catch (e) {\n\t\t\t\t\tlet method = activator === module._deactivateSingle ? 'deactivate' : 'activate';\n\t\t\t\t\tthrow new DOMException(`${method} failed because it was passed an invalid selector string: '${nodes}'`);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tif (nodes instanceof Node) {\n\t\t\t\tactivator(nodes, fn);\n\t\t\t} else if (nodes.length && nodes.forEach) {\n\t\t\t\tnodes.forEach((node) => activator(node, fn));\n\t\t\t}\n\t\t},\n\n\n\n\t\t_activateSingle: function (node, fn) {\n\t\t\tif ((node instanceof Node === false)) {\n\t\t\t\tthrow new TypeError(`activate failed because a valid Node was not passed`);\n\t\t\t}\n\n\t\t\tif (module._getNodeBindings(node, fn)) {\n\t\t\t\t// Like addEventListener, don't try to rebind new copies of the same events\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// All nodes should bind the click event\n\t\t\tnode.addEventListener('click', fn);\n\n\t\t\t// Buttons will already treat keyboard events like clicks,\n\t\t\t// so only bind them to other node types\n\t\t\tlet isButton = module._isNodeType(node, 'button');\n\t\t\tif (isButton === false) {\n\t\t\t\tif (module._getNodeHasBindings(node) === false) {\n\t\t\t\t\t// addEventListener would prevent this event being\n\t\t\t\t\t// bound multiple times, but be explicit that it is\n\t\t\t\t\t// only bound if the node has no other events bound\n\t\t\t\t\tnode.addEventListener('keydown', module._preventSpacebarScroll);\n\t\t\t\t}\n\n\t\t\t\tlet spacebarFn = module._makeSpacebarFn(fn);\n\t\t\t\tnode.addEventListener('keyup', spacebarFn);\n\t\t\t\tlet bindings = {\n\t\t\t\t\tspacebarFn\n\t\t\t\t};\n\n\t\t\t\t// Links already treat \"enter\" keydown like a click\n\t\t\t\tlet isLink = module._isNodeType(node, 'a');\n\t\t\t\tif (isLink === false) {\n\t\t\t\t\t// Note that holding down \"enter\" will behave differently\n\t\t\t\t\t// for links in that it will only fire once, whereas for\n\t\t\t\t\t// non-links, including buttons, it will fire multiple times\n\t\t\t\t\tlet enterFn = module._makeEnterFn(fn);\n\t\t\t\t\tnode.addEventListener('keydown', enterFn);\n\t\t\t\t\tbindings.enterFn = enterFn;\n\t\t\t\t}\n\n\t\t\t\tmodule._rememberNodeBindings(node, fn, bindings);\n\t\t\t}\n\t\t},\n\n\t\t_deactivateSingle: function (node, fn) {\n\t\t\tif ((node instanceof Node === false)) {\n\t\t\t\tthrow new TypeError(`deactivate failed because a valid Node was not passed`);\n\t\t\t}\n\n\t\t\tlet bindings = module._getNodeBindings(node, fn);\n\n\t\t\t// All nodes have had a click event bound\n\t\t\tnode.removeEventListener('click', fn);\n\n\t\t\tif (!bindings) {\n\t\t\t\t// No other events to unbind\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// Buttons will already treat keyboard events like clicks,\n\t\t\t// so they didn't have keyboard events bound to them\n\t\t\tlet isButton = module._isNodeType(node, 'button');\n\t\t\tif (isButton === false) {\n\t\t\t\tnode.removeEventListener('keyup', bindings.spacebarFn);\n\n\t\t\t\t// Links already treat \"enter\" keydown like a click,\n\t\t\t\t// so that event wasn't bound to them\n\t\t\t\tlet isLink = module._isNodeType(node, 'a');\n\t\t\t\tif (isLink === false) {\n\t\t\t\t\tnode.removeEventListener('keydown', bindings.enterFn);\n\t\t\t\t}\n\n\t\t\t\tmodule._forgetNodeBindings(node, fn);\n\n\t\t\t\tif (module._getNodeHasBindings(node) === false) {\n\t\t\t\t\t// Only unbind this event if the node has no other bindings\n\t\t\t\t\tnode.removeEventListener('keydown', module._preventSpacebarScroll);\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\n\n\n\t\t_rememberNodeBindings: function (node, fn, bindings) {\n\t\t\tlet nodeB = boundEvents.find(el => el.node === node);\n\t\t\tif (!nodeB) {\n\t\t\t\tnodeB = {\n\t\t\t\t\tnode: node,\n\t\t\t\t\tbindings: [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tfn\n\t\t\t\t\t\t}\n\t\t\t\t\t]\n\t\t\t\t};\n\t\t\t\tboundEvents.push(nodeB);\n\t\t\t}\n\n\t\t\tlet fnB = nodeB.bindings.find(el => el.fn === fn);\n\t\t\tif (!fnB) {\n\t\t\t\tfnB = {\n\t\t\t\t\tfn\n\t\t\t\t};\n\t\t\t\tnodeB.bindings.push(fnB);\n\t\t\t}\n\n\t\t\tObject.assign(fnB, bindings);\n\t\t},\n\n\t\t_forgetNodeBindings: function (node, fn) {\n\t\t\tlet nodeB = boundEvents.find(el => el.node === node);\n\t\t\tif (!nodeB) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tlet fnB = nodeB.bindings.find(el => el.fn === fn);\n\t\t\tif (!fnB) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tlet fnBIndex = nodeB.bindings.indexOf(fnB);\n\n\t\t\tnodeB.bindings.splice(fnBIndex, 1);\n\t\t},\n\n\t\t_getNodeBindings: function (node, fn) {\n\t\t\tlet nodeB = boundEvents.find(el => el.node === node);\n\t\t\tif (!nodeB) {\n\t\t\t\treturn undefined;\n\t\t\t}\n\n\t\t\tlet fnB = nodeB.bindings.find(el => el.fn === fn);\n\t\t\tif (!fnB) {\n\t\t\t\treturn undefined;\n\t\t\t}\n\n\t\t\treturn fnB;\n\t\t},\n\n\t\t_getNodeHasBindings: function (node) {\n\t\t\tlet nodeB = boundEvents.find(el => el.node === node);\n\t\t\treturn !!nodeB;\n\t\t},\n\n\n\n\t\t_makeEnterFn: function (fn) {\n\t\t\treturn function (e) {\n\t\t\t\tlet isEnter = module._isEnter(e);\n\n\t\t\t\tif (isEnter) {\n\t\t\t\t\tfn.apply(this, arguments);\n\t\t\t\t}\n\t\t\t};\n\t\t},\n\n\t\t_isEnter: function (e) {\n\t\t\tlet isEnter = e.key && (e.key.toLowerCase() === 'enter');\n\n\t\t\treturn isEnter;\n\t\t},\n\n\n\n\t\t_preventSpacebarScroll: function (e) {\n\t\t\t// Prevent spacebar from scrolling the page down on keydown\n\t\t\tlet node = e.target;\n\n\t\t\tlet isButton = module._isNodeType(node, 'button');\n\t\t\tlet isInput = module._isNodeType(node, 'input', 'textarea');\n\n\t\t\tlet isSpacebar = module._isSpacebar(e);\n\n\t\t\tif (!isButton && !isInput && isSpacebar) {\n\t\t\t\te.preventDefault();\n\t\t\t}\n\t\t},\n\n\t\t_makeSpacebarFn: function (fn) {\n\t\t\treturn function (e) {\n\t\t\t\tlet isSpacebar = module._isSpacebar(e);\n\n\t\t\t\tif (isSpacebar) {\n\t\t\t\t\tfn.apply(this, arguments);\n\t\t\t\t}\n\t\t\t};\n\t\t},\n\n\t\t_isSpacebar: function (e) {\n\t\t\t// IE11 uses 'spacebar' instead of ' '\n\t\t\tlet isSpacebar = e.key && (e.key === ' ' || e.key.toLowerCase() === 'spacebar');\n\n\t\t\treturn isSpacebar;\n\t\t},\n\n\n\n\t\t_isNodeType: function (node, ...nodeTypes) {\n\t\t\tnodeTypes = nodeTypes.map(el => el.toLowerCase());\n\n\t\t\tlet nodeType = node.nodeName.toLowerCase();\n\t\t\tlet isOfType = nodeTypes.includes(nodeType);\n\n\t\t\treturn isOfType;\n\t\t}\n\t};\n\n\treturn {\n\t\tactivate: module.activate,\n\t\tdeactivate: module.deactivate\n\t};\n})();\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (activate);\n\n\n//# sourceURL=webpack:///./node_modules/activate/activate.js?");

/***/ }),

/***/ "./node_modules/csv/csv.js":
/*!*********************************!*\
  !*** ./node_modules/csv/csv.js ***!
  \*********************************/
/*! exports provided: stringify, parse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"stringify\", function() { return stringify; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parse\", function() { return parse; });\nconst { stringify, parse } = (() => {\n\tconst csv = {\n\t\tstringify: function (data, options) {\n\t\t\toptions = options || {};\n\t\t\toptions.transpose = options.transpose || false;\n\t\t\toptions.sanitise = options.sanitise || false;\n\n\t\t\t// Enforce square data and apply CSV escaping, then convert to string\n\t\t\tlet rows = data;\n\n\t\t\trows = csv._shape(data, options);\n\t\t\trows = csv._escape(rows, options);\n\n\t\t\trows = csv._join(rows);\n\n\t\t\treturn rows;\n\t\t},\n\n\t\t_shape: function (data, options) {\n\t\t\t// Pad missing cells with empty strings and,\n\t\t\t// if necessary, transpose the data\n\n\t\t\tconst transpose = options.transpose;\n\n\t\t\tconst maxLength = data.reduce((maxLength, row) => Math.max(maxLength, row.length), 0);\n\n\t\t\t// Flip rows and columns if transposing data\n\t\t\tconst iMax = transpose ? maxLength : data.length;\n\t\t\tconst jMax = transpose ? data.length : maxLength;\n\n\t\t\tlet rows = [];\n\t\t\tfor (let i = 0; i < iMax; i++) {\n\t\t\t\tlet row = [];\n\t\t\t\tfor (let j = 0; j < jMax; j++) {\n\t\t\t\t\tlet iRow = transpose ? j : i;\n\t\t\t\t\tlet iCol = transpose ? i : j;\n\n\t\t\t\t\tlet cellValue = data[iRow][iCol];\n\n\t\t\t\t\tif (iCol >= data[iRow].length) {\n\t\t\t\t\t\tcellValue = '';\n\t\t\t\t\t}\n\n\t\t\t\t\trow.push(cellValue);\n\t\t\t\t}\n\t\t\t\trows.push(row);\n\t\t\t}\n\n\t\t\treturn rows;\n\t\t},\n\n\t\t_escape: function (rows, options) {\n\t\t\t// Make sure any cells containing \" or , or a newline are escaped appropriately\n\n\t\t\tconst sanitise = options.sanitise;\n\n\t\t\tfor (let i = 0; i < rows.length; i++) {\n\t\t\t\tlet row = rows[i];\n\n\t\t\t\tfor (let j = 0; j < row.length; j++) {\n\t\t\t\t\tif (typeof row[j] === 'undefined') {\n\t\t\t\t\t\t// Replace undefined with ''\n\t\t\t\t\t\trow[j] = '';\n\t\t\t\t\t} else if (typeof row[j] !== 'string') {\n\t\t\t\t\t\t// Convert to string\n\t\t\t\t\t\trow[j] = '' + row[j];\n\t\t\t\t\t}\n\n\t\t\t\t\tif (sanitise) {\n\t\t\t\t\t\t// Prevent spreadsheet software like\n\t\t\t\t\t\t// Excel from trying to execute code\n\t\t\t\t\t\tif (row[j].match(/^[=\\-+@]/)) {\n\t\t\t\t\t\t\trow[j] = '\\t' + row[j];\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\tif (row[j].match(/,|\"|\\n/)) {\n\n\t\t\t\t\t\t// Turn any double quotes into escaped double quotes\n\t\t\t\t\t\trow[j] = row[j].replace(/\"/g, '\"\"');\n\n\t\t\t\t\t\t// Wrap cell in double quotes\n\t\t\t\t\t\trow[j] = '\"' + row[j] + '\"';\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn rows;\n\t\t},\n\n\t\t_join: function (rows) {\n\t\t\tfor (let i = 0; i < rows.length; i++) {\n\t\t\t\trows[i] = rows[i].join(',');\n\t\t\t}\n\t\t\trows = rows.join('\\n');\n\n\t\t\treturn rows;\n\t\t},\n\n\n\t\tparse: function (csvString) {\n\t\t\tlet rows = csv._tokenise(csvString);\n\n\t\t\tcsv._validate(rows);\n\n\t\t\treturn rows;\n\t\t},\n\n\t\t_tokenise: function (csvString) {\n\t\t\t// Walk through each character and produce an array of tokens\n\n\t\t\tlet tokens = [];\n\n\t\t\t// Remove carriage returns\n\t\t\tcsvString = csvString.replace(/\\r/g, '');\n\n\t\t\tlet inQuote = false;\n\t\t\tlet wasQuote = false;\n\n\t\t\tlet tokenStart = 0;\n\t\t\tlet row = [];\n\t\t\tfor (let i = 0; i < csvString.length; i++) {\n\t\t\t\tlet char = csvString[i];\n\n\t\t\t\tlet comma = char === ',';\n\t\t\t\tlet quote = char === '\"';\n\t\t\t\tlet newline = char === '\\n';\n\t\t\t\tlet eof = i === csvString.length -1; // eof - End Of File\n\n\t\t\t\tif (inQuote) {\n\t\t\t\t\t// Characters may be delimited\n\t\t\t\t\tif (quote) {\n\t\t\t\t\t\t// Check if the next character is another double quote, i.e. if it is escaped\n\t\t\t\t\t\tlet nextChar = csvString[i+1];\n\n\t\t\t\t\t\tif (nextChar === '\"') {\n\t\t\t\t\t\t\t// This and the next character combined make an escaped double quote,\n\t\t\t\t\t\t\t// so the quote has not ended and we should skip over the next character\n\t\t\t\t\t\t\ti++;\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t// The quote has ended\n\t\t\t\t\t\t\tinQuote = false;\n\t\t\t\t\t\t\twasQuote = true;\n\n\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t}\n\t\t\t\t\t} else if (eof) {\n\t\t\t\t\t\tthrow new Error(`CSV parse: Reached end of file before ending quote. At index ${i}`);\n\t\t\t\t\t}\n\t\t\t\t} else if (comma || newline || eof) {\n\t\t\t\t\t\t// These are the characters that denote the end of a token\n\t\t\t\t\t\tlet token = csvString.substring(tokenStart, i+1);\n\n\t\t\t\t\t\tif (comma || newline) {\n\t\t\t\t\t\t\t// Don't keep the separator\n\t\t\t\t\t\t\ttoken = token.substring(0, token.length - 1);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tif (wasQuote) {\n\t\t\t\t\t\t\twasQuote = false;\n\n\t\t\t\t\t\t\t// Remove start and end quotes\n\t\t\t\t\t\t\ttoken = token.substring(1, token.length - 1);\n\n\t\t\t\t\t\t\t// Replace escaped quotes\n\t\t\t\t\t\t\ttoken = token.replace(/\"\"/g, '\"');\n\t\t\t\t\t\t}\n\t\t\t\t\t\trow.push(token);\n\n\t\t\t\t\t\tif (comma && eof) {\n\t\t\t\t\t\t\t// It's the end of the last token, and the last cell is empty\n\t\t\t\t\t\t\trow.push('');\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tif (newline || eof) {\n\t\t\t\t\t\t\ttokens.push(row);\n\t\t\t\t\t\t\tif (newline) {\n\t\t\t\t\t\t\t\trow = [];\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\ttokenStart = i+1;\n\t\t\t\t} else if (wasQuote) {\n\t\t\t\t\tthrow new Error(`CSV parse: A value must be complete immediately after closing a quote. At index ${i}`);\n\t\t\t\t} else if (quote) {\n\t\t\t\t\tinQuote = true;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn tokens;\n\t\t},\n\n\t\t_validate: function (rows) {\n\t\t\t// Each row of a CSV should have the same length;\n\n\t\t\tif (rows && rows.length > 1) {\n\t\t\t\tlet rowLength = rows[0].length;\n\t\t\t\tfor (let i = 1; i < rows.length; i++) {\n\t\t\t\t\tlet row = rows[i];\n\n\t\t\t\t\tif (row.length !== rowLength) {\n\t\t\t\t\t\tthrow new Error(`CSV parse: Row ${i} does not have the same length as the first row (${rowLength})`);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t};\n\n\treturn {\n\t\tstringify: csv.stringify,\n\t\tparse: csv.parse,\n\t};\n})();\n\n\n\n\n//# sourceURL=webpack:///./node_modules/csv/csv.js?");

/***/ })

/******/ });