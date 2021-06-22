import * as csv from 'csv';

let $link;

const module = {
	save: (data, options) => {
		options = options || {};

		if (data instanceof File) {
			module._saveFile(data, options);
		} else if (data instanceof Blob) {
			module._saveBlob(data, options);
		} else {
			module._saveData(data, options);
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
			module._downloadDataUrl(url, options.filename);
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
				module._downloadDataUrl(this.result, options.filename);
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

			options.filename = module._extendFilename(options.filename, 'json');
		} else if (options.type === 'text/csv') {
			if (!(typeof data === 'string' || data instanceof String)) {
				data = csv.stringify(data, options);
			}
			options.filename = module._extendFilename(options.filename, 'csv');
		}

		// Construct a Blob and download it
		let blob = new Blob(
			[data],
			{ type: options.type }
		);

		module._saveBlob(blob, options);
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

export const { save } = module;
