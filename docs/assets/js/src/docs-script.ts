import * as fileIO from '@cipscis/fileio';

let saveAs = false;
const toggleSaveAs = () => {
	saveAs = !saveAs;
	const $saveAsValue = document.querySelector<HTMLElement>('.js-save-as-value');
	if ($saveAsValue) {
		$saveAsValue.innerText = saveAs.toString();
	}
};
document.querySelectorAll('.js-save-as-toggle').forEach(($el) => $el.addEventListener('click', toggleSaveAs));

const loadImage = (fileUrl: string) => {
	const $image = document.querySelectorAll<HTMLImageElement>('.js-fileio-image');
	$image.forEach(($image) => $image.src = fileUrl);
};
document.querySelectorAll('.js-load-image').forEach(($el) => $el.addEventListener('click', () => {
	fileIO.load(fileIO.ReadMethod.DataUrl).then(loadImage);
}));

const saveData = () => {
	const data = 'Hey look, the file has some content!';
	const filename = 'test file.txt';
	const type = 'text/plain';

	fileIO.save(data, { filename, type, saveAs });
};
document.querySelectorAll('.js-save-data').forEach(($el) => $el.addEventListener('click', saveData));

const saveJson = () => {
	const data = {
		text: 1,
		foo: 'bar',
	};
	const filename = 'test json';

	fileIO.save(data, { filename, type: 'json', saveAs });
};
document.querySelectorAll('.js-save-json').forEach(($el) => $el.addEventListener('click', saveJson));

const saveCsv = () => {
	const data = [
		['even numbers', 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
		['odd numbers', 1, 3, 5, 7, 9],
		['prime numbers, up to ten', 2, 3, 5, 7],
	];
	const filename = 'test csv';

	fileIO.save(data, {filename, type: 'csv', saveAs, transpose: true });
};
document.querySelectorAll('.js-save-csv').forEach(($el) => $el.addEventListener('click', saveCsv));

const saveFile = async () => {
	const file = await fileIO.load(fileIO.ReadMethod.File);
	fileIO.save(file, { saveAs });
};
document.querySelectorAll('.js-save-file').forEach(($el) => $el.addEventListener('click', saveFile));
