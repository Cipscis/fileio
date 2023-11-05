import { ReadMethod } from './ReadMethod.js';

/**
 * Load a file via the browser's built-in file selection field.
 *
 * WARNING: If the user chooses not to select a file, the returned Promise will never resolve or reject.
 *
 * @param  {ReadMethod} readMethod - A string representing the way the data to be loaded is represented. Available options are exposed via fileio.ReadMethod
 *
 * @throws {DOMException} - Thrown if reading a File object fails.
 * @throws {RangeError} - readMethod must be a recognised ReadMethod.
 *
 * @return {Promise} Resolves with the contents of the selected file.
 */
export function load(readMethod: ReadMethod.ArrayBuffer): Promise<ArrayBuffer>;
export function load(readMethod?: ReadMethod.BinaryString | ReadMethod.DataUrl | ReadMethod.Text): Promise<string>;
export function load(readMethod: ReadMethod.File): Promise<File>;
export function load(readMethod?: ReadMethod): Promise<File | string | ArrayBuffer> {
	readMethod = readMethod ?? ReadMethod.Text;

	return new Promise((resolve, reject) => {
		function fileLoaded(this: FileReader, e: ProgressEvent<FileReader>) {
			const reader = this;

			if (reader.readyState === FileReader.DONE) {
				if (reader.result) {
					resolve(reader.result);
				} else {
					if (reader.error) {
						reject(reader.error);
					} else {
						reject(new DOMException('Error parsing file'));
					}
				}
			}
		}

		function readFile(file: File): void {
			const reader = new FileReader();

			reader.addEventListener('load', fileLoaded);
			reader.addEventListener('error', () => {
				reader.abort();
				if (reader.error) {
					reject(reader.error);
				} else {
					reject(new DOMException('Error parsing file'));
				}
			});

			switch (readMethod) {
				case ReadMethod.ArrayBuffer:
					reader.readAsArrayBuffer(file);
					break;
				case ReadMethod.BinaryString:
					reader.readAsBinaryString(file);
					break;
				case ReadMethod.DataUrl:
					reader.readAsDataURL(file);
					break;
				case ReadMethod.Text:
					reader.readAsText(file);
					break;
				default:
					reject(new RangeError(`FileIO: Unrecognised readMethod ${readMethod}`));
					break;
			}
		}

		if ('showOpenFilePicker' in window) {
			window.showOpenFilePicker().then(async ([handle]) => {
				if (handle.kind === 'file') {
					const file = await handle.getFile();

					if (readMethod === ReadMethod.File) {
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

		function loadSelectedFileEvent(this: HTMLInputElement, e: Event): void {
			const $fileInput = this;

			const files = $fileInput.files;
			if (files && files.length > 0) {
				const file = files[0];

				if (readMethod === ReadMethod.File) {
					resolve(file);
				} else {
					readFile(file);
				}
			}
		}

		const $fileInput = document.createElement('input');
		$fileInput.type = 'file';
		$fileInput.addEventListener('change', loadSelectedFileEvent);

		$fileInput.click();
	});
}
