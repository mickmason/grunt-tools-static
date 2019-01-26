# Big Cat Static Website Grunt Tools 
## About
Big Cat Static Website build Grunt Tools.
## Modularized Grunt tasks
[`load-grunt-configs`](https://github.com/creynders/load-grunt-configs) and [`load-grunt-tasks`](https://github.com/sindresorhus/load-grunt-tasks) are used to modularize tasks' configruation. 
The `Gruntfile.js` loads in the tasks and locates the config files for `load-grunt-tasks` and `load-grunt-configs` respectively. Tasks are read from `package.json`'s `dependencies` and `devDependencies` and are called from the `default` and `build` tasks which are described below. 
`load-grunt-configs` gets an `options` object which provides the location of the source files, a reference to `package.json` and a `paths` object to use in config modules for `.js` and `.scss` etc file paths.
`load-grunt-tasks` is called directly and gets the list of tasks from `dependencies` and `devDependencies`, and the `configs` are passed into a call to `grunt.initConfig(configs)`. 
## Two tasks
There are two primary tasks: `server` (default) and `build`. `build` is called at build time and `server` is the development task.
Run `grunt` for the development version, run `grunt build` to build the production site. 
### Development 
It runs as `server` and calls `express` ([grunt-express](https://www.npmjs.com/package/grunt-express)) and `watch` ([grunt-contrib-watch](https://www.npmjs.com/package/grunt-contrib-watch)).
Watch uses:
* `sass` [grunt-contrib-sass](https://www.npmjs.com/package/grunt-contrib-sass); source files are `development/src/sass/style.scss`, which is compiled into `www-root/assets/css/style.css`; and `development/src/sass/print.scss` which is compiled into `www-root/assets/css/print.css`.
* `scripts`concatenates scripts using [grunt-contrib-concat](https://www.npmjs.com/package/grunt-contrib-concat) `dev` sub-task after linting with [`jshint`](https://jshint.com/). Scripts are left unminified and copied to `www-root/assets/js/scripts.js`. 
* `htmlcompile` uses [grunt-include-replace](https://www.npmjs.com/package/grunt-include-replace) to include HTML modules from `development/src/html/includes`. Output files go to `www-root/`.
* `media` will copy any media files from `development/src/media/` to `www-root/assets/media/` when new image or video media files are added.
* `svg` uses [grunt-svgstore](https://www.npmjs.com/package/grunt-svgstore) to build an SVG stack when new icons are added or updated. Src files are in `development/src/media/icons/*.svg` and are compiled into and SVG stack as `www-root/assets/media/svg/bc-icons.svg`.

### Build
This is a one-shot run. It is called with `grunt build` at the command line.
It calls:
* `includereplace`, as for development.
* `sass`, as for development.
* Then [`grunt-run`](https://www.npmjs.com/package/grunt-run) is used to call:
⋅⋅* `jshint` is called again as for dev.
⋅⋅* [`babel`](https://babeljs.io/) is used to do any required conversion of ECMA6+ syntax to ECMA5. Config for this is in `babel.config.js`.
⋅⋅* `ugligifiy` using [grunt-contrib-uglify](https://www.npmjs.com/package/grunt-contrib-uglify)
* Then the `concatenate:dist` sub-task is called to pull the minified scripts together.
A temp folder is used to get the `babel`-ified script for `uglify`, the `concat:dist` copies the minified and concatenated scripts file to `www-root/assets/js/` as `scripts.min.js`. 

-----
## Dependencies

You will need to have these.

### NPX

This is used to run JSHint, Babel and Uglify tasks.

[`npx`](https://www.npmjs.com/package/npx)
