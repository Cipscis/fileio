# base-project

This is my base project to use when creating new projects.

## Install

You will need to install [Node.js](https://nodejs.org/en/) before using this project, because it relies on the [npm](https://www.npmjs.com/) package manager that comes bundled with Node.js

1. Fork this repository
2. Update the `package.json` file to reflect your new project's details
3. Create a `.env` file. See [.env](#env) for more information
4. Run `npm install`

## Usage

This project creates three npm tasks:

* `server`
* `watch`
* `start`

Usually, you will just want to run `npm start`. This will run both the `server` and `watch` tasks simultaneously.

The `server` task runs a Node.js server on the port specified in the [`.env`](#env) file, using [Express](https://expressjs.com/).

The `watch` task compiles CSS files using [gulp-sass](https://www.npmjs.com/package/gulp-sass) and bundles JavaScript using [webpack-stream](https://www.npmjs.com/package/webpack-stream), then watches the relevant directories and rebuilds these files if it sees and changes.

## Structure

### Frontend assets

Assets such as CSS and JavaScript are contained in `./assets`. In here, the contents of the `scss` folder are used to compile CSS files into the `css` folder.

The `assets/js` folder contains a `src` folder and a `dist` folder. The JavaScript files inside the `src` folder are bundled into the `dist` folder. By default, Webkit is configured to look for a single entry point at `./assets/js/src/main.js`.

### Backend assets

The Node.js server run using [Express](https://expressjs.com/) has its files inside the `./server` directory. By default, this just runs a static http server, but it can be extended to add additional functionality.

## Configuration

### gulpfile.js

This file tells [Gulp](https://gulpjs.com/) which files to watch and where to output compiled assets. Some configuration for JavaScript bundling is duplicated between here and [`webpack.config.js`](#webpackconfigjs)

### webpack.config.js

This file configures [Webpack](https://webpack.js.org/), telling it which entry points to use and where to output its bundled assets. Some configuration is duplicated between here and [`gulpfile.js`](#gulpfilejs)

### .env

The `.env` file contains the following environment variables:

* `MODE` (`string 'development' | 'production'`)

This is used by Webpack to determine what optimisations to use and how to generate sourcemaps.

* `PORT` (`int`)

This is used by [Express](https://expressjs.com/) to determine which port to use when running a local Node.js server.

An example `.env` file you can use for development is:

```
MODE = "development"
PORT = "8080"
```

This file is intended to differ from environment to environment, so it is ignored by Git.

## Dependencies

[npm](https://www.npmjs.com/): Package manager

[Gulp](https://gulpjs.com/): Task runner

[gulp-sass](https://www.npmjs.com/package/gulp-sass): Compiling CSS from [Sass](https://sass-lang.com/)

[webpack-stream](https://www.npmjs.com/package/webpack-stream): Using [Webpack](https://webpack.js.org/) (for JavaScript dependency management) with Gulp

[Express](https://expressjs.com/): Running a Node.js server, accessed at `http://localhost:<PORT>`

[Concurrently](https://www.npmjs.com/package/concurrently): Running server and development build tasks concurrently

[dotenv](https://www.npmjs.com/package/dotenv): Reading environment variables from [`.env`](#env) file
