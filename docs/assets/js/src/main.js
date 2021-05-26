import fileIO from '/fileio';
import activate from 'activate';

const loadImage = (fileUrl) => {
	let $image = document.querySelectorAll('.js-fileio-image');
	$image.forEach(($image) => $image.src = fileUrl);
};
activate('.js-load-image', () => {
	fileIO.load({ readMethod: 'dataUrl' }).then(loadImage);
});

const saveData = () => {
	let data = 'Hey look, the file has some content!';
	let filename = 'test file.txt';
	let type = 'text/plain';

	fileIO.save(data, { filename, type });
};
activate('.js-save-data', saveData);

const saveJson = () => {
	let data = {
		text: 1,
		foo: 'bar'
	};
	let filename = 'test json';

	fileIO.save(data, { filename, type: 'json' });
};
activate('.js-save-json', saveJson);

const saveCsv = () => {
	let data = [
		['even numbers', 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
		['odd numbers', 1, 3, 5, 7, 9],
		['prime numbers, up to ten', 2, 3, 5, 7]
	];
	let filename = 'test csv';

	fileIO.save(data, {filename, type: 'csv', transpose: true });
};
activate('.js-save-csv', saveCsv);

const saveFile = async () => {
	const file = await fileIO.load({ readMethod: 'file' });
	fileIO.save(file);
};
activate('.js-save-file', saveFile);
