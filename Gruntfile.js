module.exports = function(grunt) {
  // Load the various tasks required
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-include-replace');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-parallel');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-concat');
    

  //Uncomment the line below to add HTML Validation to the project
  //  grunt.loadNpmTasks('grunt-html-validation');


  //Uncommment the line below to add JSHint into the project (Ctrl+f to find all regions needed to be uncommented in order to add in JSHint)
  //grunt.loadNpmTasks('grunt-contrib-jshint');

  //Uncomment the line below to add csslint to the project (Ctrl+f to find all regions needed to be uncommented in order to add in csslint)
  //grunt.loadNpmTasks('grunt-contrib-csslint');

  //Uncomment the line below to add text replace to the project
  //grunt.loadNpmTasks('grunt-text-replace');
  
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    express: {
      all: {
        options: {
          port: 9001,
          hostname: '0.0.0.0',
          bases: ['www-root'],
          livereload: true,
          open: true
        }
      }
    },
    
    bower: {
      install: {
         options: {
           targetDir: 'development/lib',
           layout: 'byComponent',
           cleanup: true
         }//options
      }//install
    },//bower
    
    //Uncomment this region to add in JSHint to the project.
    /*jshint: {
      options: {
        jshintrc : '.jshintrc'
      },//options
      all : ['development/terminalfour/js/*.js']
    },//jshint
    */

    uglify: {
      options: {
        banner: '/** \n * TERMINALFOUR custom scripts \n * Created by <%= pkg.developer %> \n  */\n',
        preserveComments : 'all',
        mangle : true
      },//options
      build: {
        src: 'development/terminalfour/src/js/scripts.js',
        dest: 'development/terminalfour/src/js/scripts.min.js',   
      },//build
      
      
    }, //uglify
      
    concat: {
        options: {
           banner: '\n/** \n * TERMINALFOUR custom and concatenated library scripts \n * Client: <%= pkg.clientName %>\n * Project: <%= pkg.projectName %>\n * Version: <%= pkg.version %>\n * Description: <%= pkg.description %>\n * Copyright <%= grunt.template.today("yyyy") %>\n * Created by <%= pkg.developer %>\n * on behalf of TERMINALFOUR\n * www.terminalfour.com\n*/\n',
        },
        dist: {
          src: [
              'development/lib/jquery-ui/jquery-ui.min.js',  
              'development/lib/bootstrap.min.js',  
              'development/lib/slick/slick/slick.min.js', 
              'development/lib/jquery-match-height/jquery.matchHeight.js', 
              'development/lib/ekko-lightbox/ekko-lightbox.js', 
              'development/terminalfour/src/js/scripts.js'
          ], 
          dest: 'www-root/style-assets/js/t4-scripts.min.js'
        }
      },//concat
    
    sass: {
      dist: {
        options: {
          style: 'expanded',
        },//options
        files: {
          'www-root/style-assets/css/style.css': 'development/terminalfour/src/sass/style.scss',
          'www-root/style-assets/css/style-ie.css': 'development/terminalfour/src/sass/style-ie.scss'

        }//files
      }//dist
    },//sass
    
    //Uncomment this region to add csslint to the project
    /*
    csslint: {
      strict: {
        options: {
          csslintrc: '.csslintrc',
          formatters: [
            {id: 'text', dest: 'report/csslint.txt'}
          ]
        },
        src: ['www-root/style-assets/css/style.css']
      }
    },//csslint
    */
    
    //Uncomment the block below to add text replace to the project
    /*
    replace: {
      css: {
        src: ['www-root/style-assets/css/style.css'],
        overwrite: true,
        replacements: []
      }//css
    },//replace
    
    */

    //Uncomment the region below to add HTML Validation into the project
    /*
    validation: {
      options: {
        reset: true,
        path: 'report/validation-status.json',
        reportpath: 'report/validation-report.json'
      },//options
      files: ['*.html']
    },//validation
    */
    svgstore: {
        options: {
          prefix: '',
          svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
            viewBox : '0 0 100 100',
            xmlns: 'http://www.w3.org/2000/svg'
          },
          cleanup: 'style'
        },
        default : {
            
          files: {
            'www-root/style-assets/media/svg/dfa-icons.svg': ['development/terminalfour/src/media/svg-imgs/*.svg'],
          },
        },
      },
    includereplace: {
      dist: {
        options: {
          includesDir: 'development/terminalfour/src/html/includes'
        },
        files: [
          {src: '**/*.html', dest: 'www-root/', expand: true, cwd: 'development/terminalfour/src/html/'}
        ]
      }
    },//includereplace
    
    copy: {
      copyJsLibs: {
        files: [
          {expand: true, cwd: 'development/lib/', src: ['jquery-3.1.1/jquery-3.1.1.min.js', 'jquery-validate/jquery-validate-1.10.1.min.js'], dest: 'www-root/style-assets/lib/', filter: 'isFile'}
        ]
      },//main
      media: {
        files: [
          {expand: true, cwd: 'development/terminalfour/src/media/', src: ['**/*'], dest: 'www-root/style-assets/media/', filter: 'isFile'}
        ]
      }//main
    },//copy

    watch: {
      options: { livereload: true },
      sass: {
        files: ['development/**/**/**/*.scss', 'bower_components/**/*.scss'],
        
        //Uncomment the line below and delete the other tasks line to add csslint into the project
        //tasks: ['sass:dist','csslint:strict']
        
        //Uncomment the line below to add in text replace
        //tasks: ['sass:dist','replace-pre']

        tasks: ['sass:dist', 'copy:copyJsLibs']

      },//sass
        
      scripts: {
        files: ['development/terminalfour/src/js/scripts.js'],
        //Uncomment the line below and delete the other "tasks:['uglify:build'] to add JSHint into the project"
        //tasks: ['jshint','uglify:build']
        tasks: ['concat:dist', 'copy:copyJsLibs']
          
      },//scripts

      htmlcompile: {
        files: ['development/terminalfour/src/html/**/*.html'],
        tasks: ['includereplace']
      },//htmlcompile
      media: {
          files: ['development/terminalfour/src/media/**/*.*'],
          tasks: ['copy:media', 'svgstore']
      }
      //Uncomment the region below to add HTML Validation into the project (Dont forget to add a comment on the line above after the HTML compile curly braces right before the comment)
      // html: {
      //   files: ['www-root/**/*.html'],
      //   tasks: ['validation']
      // }

    }//watch
    
  });

  // Default task(s).
  grunt.registerTask('default', ['server']);
  
  /*grunt.registerTask('replace-pre', function() {
    var cssReplacements = grunt.file.readJSON('replacements.json');
    grunt.config('replace.css.replacements', cssReplacements);
    grunt.task.run('replace');
  });
  */
  grunt.registerTask('server', [
    'express',
    'watch',
    'express-keepalive'
  ]);

};