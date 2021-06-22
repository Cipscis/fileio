# FileIO Changelog

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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