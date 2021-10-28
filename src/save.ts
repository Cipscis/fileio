import { StringifyOptions } from '@cipscis/csv';
import * as csv from '@cipscis/csv';

declare global {
	interface Navigator {
		msSaveBlob?: (blob: any, defaultName?: string) => boolean
	}
}

export interface SaveOptions extends StringifyOptions {
	filename?: string,
	type?: string
}

let $link: HTMLAnchorElement;

/**
 * Save arbitrary data as a file, using the browser's built-in save file window.
 *
 * @param {any} data - Data to save in a file
 * @param {SaveOptions} [options] - An object containing options for how to save the file.
 * @param {string} [options.filename] - The name to use for the file being saved.
 * @param {string} [options.type] - The type of data being saved.
 *
 * @throws {TypeError} - Thrown if data attempting to be saved as JSON fails to stringify.
 * @throws {DOMException} - Thrown if reading a File object fails.
 */
function save(data: any, options?: SaveOptions): void {
	if (data instanceof File) {
		_saveFile(data, options);
	} else if (data instanceof Blob) {
		_saveBlob(data, options);
	} else {
		_saveData(data, options);
	}
}

/**
 * Save data that you have as a Blob.
 *
 * @param {Blob} blob - Data to save.
 * @param {SaveOptions} [options] - An object containing options for how to save the file.
 * @param {string} [options.filename=file] - The name to use for the file being saved.
 */
function _saveBlob(blob: Blob, options?: SaveOptions): void {
	if (!(blob instanceof Blob)) {
		throw new TypeError('FileIO: save blob requires a Blob');
	}

	const filename = options?.filename || 'file';

	if (navigator.msSaveBlob) {
		navigator.msSaveBlob(blob, filename);
	} else {
		const url = URL.createObjectURL(blob);
		_downloadDataUrl(url, filename);
	}
}

/**
 * Save data that you have as a File object.
 *
 * @param {File} file - Data to save.
 * @param {SaveOptions} [options] - An object containing options for how to save the file.
 * @param {string} [options.filename=file] - The name to use for the file being saved. If the File has a name, it will be used by default.
 *
 * @throws {DOMException} - Thrown if reading a File object fails.
 */
function _saveFile(file: File, options?: SaveOptions): void {
	if (!(file instanceof File)) {
		throw new TypeError('FileIO: save file requires a File');
	}

	const filename = options?.filename || file.name || 'file';

	if (navigator.msSaveBlob) {
		navigator.msSaveBlob(file, filename);
	} else {
		const reader = new FileReader();

		reader.addEventListener('load', function () {
			if (reader.readyState === FileReader.DONE) {
				if (reader.result) {
					// Because we called readAsDataURL,
					// the result will be a string
					const result = reader.result as string;

					_downloadDataUrl(result, filename);
				} else {
					if (reader.error) {
						throw reader.error;
					} else {
						throw new DOMException('Error parsing file');
					}
				}
			}
		});
		reader.addEventListener('error', () => {
			reader.abort();
			if (reader.error) {
				throw reader.error;
			} else {
				throw new DOMException('Error parsing file');
			}
		});

		reader.readAsDataURL(file);
	}
}

/**
 * Save arbitary data as a file.
 *
 * @param {any} data - Data to save as a file.
 * @param {SaveOptions} [options] - An object containing options for how to save the file.
 * @param {string} [options.filename=file] - The name to use for the file being saved.
 * @param {string} [options.type] - The type of data being saved.
 *
 * @throws {TypeError} - Thrown if data attempting to be saved as JSON fails to stringify.
 */
function _saveData(data: any, options?: SaveOptions): void {
	let filename = options?.filename || 'file';
	let type = options?.type || 'text/plain'

	// Type shorthands
	switch (type) {
		case 'json':
			type = 'application/json';
			break;
		case 'csv':
			type = 'text/csv';
			break;
	}

	if (type === 'application/json') {
		// May throw an error
		data = JSON.stringify(data);

		filename = _extendFilename(filename, 'json');
	} else if (type === 'text/csv') {
		if (typeof data !== 'string') {
			data = csv.stringify(data, options);
		}
		filename = _extendFilename(filename, 'csv');
	}

	// Construct a Blob and download it
	let blob = new Blob(
		[data],
		{ type }
	);

	_saveBlob(blob, options);
}

/**
 * Download a file by using a Data URL to click an anchor.
 *
 * @param {string} dataUrl - The Data URL to download.
 * @param {string} filename - The name of the file to be downloaded.
 */
function _downloadDataUrl(dataUrl: string, filename: string): void {
	$link = $link || document.createElement('a');
	$link.href = dataUrl;
	$link.download = filename;
	$link.click();

	URL.revokeObjectURL(dataUrl);
}

/**
 * Adds a file extension to a filename if it doesn't already have one.
 *
 * @param  {string} filename - The file name to extend
 * @param  {string} extension - The extension to add. Don't include the '.'
 *
 * @return {string} `${filename}.${extension}`
 */
function _extendFilename(filename: string, extension: string): string {
	let testPattern = new RegExp('\\.' + extension + '$');

	if (!testPattern.test(filename)) {
		filename += '.' + extension;
	}

	return filename;
}

export { save };
