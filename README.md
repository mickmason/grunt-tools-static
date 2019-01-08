# Big Cat Static Website Grunt Tools 

- Welcome

-----
## About

Big Cat Static Website Grunt Tools.

To be brought up to date in some places. Or jettisoned altogether...

-----
## Two builds

There are two builds: developement (default) and build.

Run `grunt` for the development version, run `grunt build` to build the production site. 

### Development 

This runs as the default. It runs `express` ([grunt-express](https://www.npmjs.com/package/grunt-express)) and `watch` ([grunt-contrib-watch](https://www.npmjs.com/package/grunt-contrib-watch)).

Watch uses:
* `sass` uses [grunt-contrib-sass](https://www.npmjs.com/package/grunt-contrib-sass).
* `scripts` which concatenates scripts without minifying or linting using [grunt-contrib-concat](https://www.npmjs.com/package/grunt-contrib-concat) `dev` sub-task.
* `htmlcompile` which uses [grunt-include-replace](https://www.npmjs.com/package/grunt-include-replace).
* `media` will copy any media files when new image or video media files are added.
* `svg` uses [grunt-svgstore](https://www.npmjs.com/package/grunt-svgstore) to build an SVG stack when new icons are added to the src.

### Build

This is a one-shot run. It is called with `grunt build` at the command line.

It calls:

* `includereplace`
* `sass`
* [grunt-run](https://www.npmjs.com/package/grunt-run) to call:
⋅⋅* [`jshint`] [JSHint](https://jshint.com/)
⋅⋅* [`babel`](https://babeljs.io/)
⋅⋅* `ugligifiy` using [grunt-contrib-uglify](https://www.npmjs.com/package/grunt-contrib-uglify)
⋅⋅* 
* `concatenate` sub-task `dist`

-----
## Dependencies

You will need to have these.

### NPX

This is used to run JSHint, Babel and Uglify tasks.

[`npx`](https://www.npmjs.com/package/npx)
