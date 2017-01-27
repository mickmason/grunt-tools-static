# DFA Feature landing page

- Introduction
- Tools we are going to use
- Installation
- Creating a new project

-----
## About

This is a feature landing page for use in various DFA sites. It's use is particularly for one-off, featured events like, for example, the Africa Ireland Economic Forum. It can be used as a one-page site or links can be added to further reading content.

---
## Tools



### SASS

[SASS](http://sass-lang.com) 

### Grunt

[Grunt](http://gruntjs.com/) 

Using the following Grunt plugins for development:

- [Bower Task](https://github.com/yatskevich/grunt-bower-task) - Allows installation of libraries using Bower
- [Uglify](https://github.com/gruntjs/grunt-contrib-uglify) – Minifies JavaScript files
- [SASS](https://github.com/gruntjs/grunt-contrib-sass) - Allows compiling of SASS files to CSS
- [Include Replace](https://github.com/alanshaw/grunt-include-replace) - allows includes to be used to modulise HTML files
- [Watch](https://github.com/gruntjs/grunt-contrib-watch) – Watches for changes in working files
- [Copy](https://github.com/gruntjs/grunt-contrib-copy) - Moves files around and into the correct locations
- [Express](https://github.com/blai/grunt-express) - Creates an onn the fly web server and launches it

- [JSHint](https://github.com/gruntjs/grunt-contrib-jshint) – Checks JavaScript syntax
- [CSSLint](https://github.com/gruntjs/grunt-contrib-csslint) - Checks CSS syntax for possible errors and pitfalls


### Node.js

You will need [http://nodejs.org/](http://nodejs.org/) to run the files.

## Frameworks/plugins

If you want to add any of the additional packages you will have to edit ```package.js```, ```bower.json``` and ```Gruntfile.js``` and uncomment the relevant lines of code for your module **before** you run the installation

- [JSHint](https://github.com/gruntjs/grunt-contrib-jshint) – Checks JavaScript syntax
- [CSSLint](https://github.com/gruntjs/grunt-contrib-csslint) - Checks CSS syntax for possible errors and pitfalls
- [Compass](https://github.com/gruntjs/grunt-contrib-compass) – add additional mixins to SASS
- [Bourbon](http://bourbon.io/)

also included but commented out are

- [Bootstrap Sass](https://github.com/twbs/bootstrap-sass) customized for this project
- [JQuery](https://jquery.com/)
- [Slick slider](https://github.com/kenwheeler/slick/)

---
## Using Grunt to do the grunt work

We have our setup ready to go, but we haven’t automated anything yet. You might have noticed a file called `Gruntfile.js` in the project folder. This file controls how Grunt works and what it does. This file has been written for you already and should do everything we need, so it’s not recommended to edit this file unless you need a separate specific task to be run on your project.

###File Layout

This template is set up to work with two main folders, 'development' and 'www-root'

The 'development' folder is where all the files you will actually be coding will be kept. 

- HTML files should go in 'development/terminalfour/html/src'
- Javascript files should go in 'development/terminalfour/js/'
- SCSS/CSS files should go in 'development/terminalfour/sass/'

When Grunt is running, the `watch` task will watch this directory and when a change is made it will refresh your browser automatically to show the change as well as replicate the files in this folder as well as the filetree and add them into the `www-root` folder.

This means when you want to reference a stylesheet from your HTML file, you must reference it as if the file was in the `www-root` folder not the development folder

The `www-root` folder is where all the files will be served from when Grunt is run (Don't forget, Grunt runs a temporary web server that will serve files)


#Getting Started
There is an index.html file in `development/terminalfour/html/src` that you can begin to edit and change to start creating your project

You can also create a directory structure under the `src` directory to mimic what Site Manager will publish. The structure will be replicated when the files are compiled.

To start Grunt, open your command prompt again and make sure you are looking at the project directory’s root folder (the same folder as `Gruntfile.js`). Simply type the following command and watch grunt start up:

```bash
grunt
```

Grunt has been set up to do several things. The most important task, and the default one, is for Grunt to spin up a new web server and then start watching your files for changes. You will have noticed that the Grunt CLI says:

```bash
Running "express:all" (express) task

Running "express-server:all" (express-server) task
Web server started on port:9001, hostname: 0.0.0.0 [pid: 2388]

Running "copy:main" (copy) task

Running "watch" task
Waiting...
```

As long as you have your command prompt open, Grunt will monitor your files and 'watch' for changes in them and keep the web server running.

Now if you make any changes to your project files, grunt will detect this and start running additional tasks as it needs to. For example, in the next step, you’ll edit your `style.scss` stylesheet and save it. Grunt will detect this, start compiling it, checking all your SASS, then compile a new CSS file under `www-root/style-assets/css/style.css`

---
## Grunt tasks

So, what’s actually going on here? There are a few tasks that are being run when we use grunt. This is to try and make our code as efficient as possible and to create a standard way that we code using CSS etc.

The first thing to realise is that all your development work should be carried out in the `_` directory and below. With Grunt running, whenever you save something in this directory, the relevant tasks are run and the resultant HTML/CSS/JS files are created in the root of your project folder in a `www-root` directory. This directory is also set as the root of the web server that Grunt spins up for you.

### Express

The Express grunt task is being used to create an on-the-fly web serevr for your project. This ensures that the site you are previewing should behave the same as it would on an actual server.

### Copy
The Copy task is simply used to move files around, in this case, taking all the bootstrap/foundation etc JavaScript files and placing them under the `style-assets` directory.


### Minifying

Whenever you save a CSS or JavaScript file, your SASS files and scripts are analysed and then minified into the style-assets directory.

### Code checking

Your CSS code is run through CSSLint to check for potential errors and to enforce certain coding standards. Any errors are output to the console, but they are also stores in a text file in the report directory in your project.

Your JavaScript files are run through JSLint to ensure they are valid also.

Any HTML files are validated against W3C standards. A report of the validation result is created in the report directory of your project.

### Includes

You can modularise your HTML into separate files if you like. For example you might have a consistent header section within your pages. Instead of having this code at the top of every page, you can separete this out into a seperate file and include it in your cutup files.

All includes should be placed in the `_/components/terminalfour/html/includes/` directory and to reference them to be included use the @@ syntax. For example, let's say you had your header section saved in a file called `header.html` in your includes directory. You can reference this in other files using the following code:

```html
@@include('header.html')
```

You can also use variables inside your include files which can be passed as part of the include statement. Let's say your header file is `<head>` section of your HTML and you want to be able to change the `<title>` tag for each page, within your include file you might have the following code:

```html
<title>University name - @@pageTitle</title>
```

You can pass in a variable in your include statement like so (notice there is no need for a semi-colon at the end):

```html
@@include('header.html', {"pageTitle": "Homepage"})
```

Another usefull example of this could be to have several HTML files in your includes folder, each one representing a content type. Within these files, you could place variables for each of the elements, then call  these from another file, passing in the variables as arguments. This allows a central place where you can manage how a content type is coded up and you can build up various page layout examples by simply referencing these includes.

### Tag replacement in CSS files

If you have already imported your images into Site Manager using the Media Loader, you can use the `replacements.json` file that the media loader provides to replace all the references in your CSS files. Simply place the `replacements.json` file at the root of your project and your style.css will have its image references replaced with t4 tags. You can continue to use the style-local.css file for local development.
