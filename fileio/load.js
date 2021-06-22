const module = {
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
};

export const { load } = module;
