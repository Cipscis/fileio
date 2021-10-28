# FileIO Changelog

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.0] - 2021-10-29

### Added

* The `load` method will now use the [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API)'s `showOpenFilePicker` method if it's available.
* The `save` method now has a `saveAs` option that will tell it to use the [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API)'s `showSaveFilePicker` method if it's available.

### Fixed

* Extended the `Navigator` interface to define `msSaveBlob`, which is not included in the latest versions of TypeScript.

## [3.0.0] - 2021-08-15

### Changed

* Published to npm, now requiring different install method.
* Converted to TypeScript.
* The `load` method now takes its `readMethod` argument directly, instead of inside an optional `options` object.

### Added

* Added new `ReadMethod` enum export for use with the `load` method.
* The `save` method now throws an error if attempting to call `JSON.stringify` on data it's trying to save as JSON throws an error.

## [2.1.0] - 2021-06-22

### Added

* `exports` section in `package.json` to allow `load` and `save` to be imported in isolation.

## [2.0.0] - 2021-06-22

### Removed

* There is no longer a default export object from `fileio.js`.

### Changed

* Split `save` and `load` into their own files, so they can be loaded in isolation.

### Fixed

* Removed duplicate internal `_downloadDataUrl` method.

## [1.2.3] - 2021-06-19

### Changed

* Reworked the build system to automatically build and publish documentation to GitHub Pages on push to `main`.
* Removed a dependency from example code.

## [1.2.2] - 2021-05-29

### Fixed

* Fixed an error in the Webpack config file.

## [1.2.1] - 2021-05-26

### Changed

* Moved documentation into `main` branch.

## [1.2.0] - 2021-05-25

### Changed

* If data trying to be savede with type `text/csv` is a sstring, save it directly instead of trying to manipulate it into CSV data first.

## [1.1.0] - 2021-05-23

### Changed

* CSV stringifying code has been moved into a separate package that is now a dependency. See [CSV](https://github.com/cipscis/csv).

## [1.0.0] - 2021-05-22

### Added

* Initial commit
