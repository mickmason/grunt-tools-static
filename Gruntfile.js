module.exports = function(grunt) {
  // Load the various tasks required
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-include-replace');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-parallel');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-run');
	
  //Uncomment the line below to add HTML Validation to the project
  //  grunt.loadNpmTasks('grunt-html-validation');

  //Uncommment the line below to add JSHint into the project (Ctrl+f to find all regions needed to be uncommented in order to add in JSHint)
  //grunt.loadNpmTasks('grunt-contrib-jshint');

  //Uncomment the line below to add csslint to the project (Ctrl+f to find all regions needed to be uncommented in order to add in csslint)
  //grunt.loadNpmTasks('grunt-contrib-csslint');
  
	const projectFiles = {
		jsFiles: {
			src: ['development/src/js/scripts.js', 'development/src/js/scripts2.js'],
			dest: {
				dev: 'www-root/assets/js/scripts.js',
				dist: 'www-root/assets/js/scripts.js'
			}
		}
	}
	
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
		run: {
			options: {
				failOnError: true
			},
			jshint: {
				cmd: 'npx',
				args: ['jshint', projectFiles.jsFiles.src[0], projectFiles.jsFiles.src[1]]
			},
			babel: {
				cmd: 'npx',
				args: ['babel', projectFiles.jsFiles.src[0], '--out-dir', 'development/src/js/temp/']
			},
			uglify: {
				cmd: 'npx',
				args: ['uglifyjs', 'development/src/js/temp/scripts.js', '-o', 'development/src/js/temp/scripts.min.js', '-m']
			}
		},
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
    uglify: {
			dist: {
				options: {
					banner: '/** \* Big Cat Digital custom scripts * \n **/',
					mangle : true
      	},//options
      	src: 'development/src/js/scripts.js',
      	dest: 'development/src/js/scripts.js'
			}
		}, //uglify
    concat: {
      options: {
         banner: '\n/** \n * Big Cat Digital custom and concatenated library scripts \n * Client: <%= pkg.clientName %>\n * Project: <%= pkg.projectName %>\n * Version: <%= pkg.version %>\n * Description: <%= pkg.description %>\n * Copyright <%= grunt.template.today("yyyy") %>\n * Created by <%= pkg.developer %>\n * on behalf of TERMINALFOUR\n * www.terminalfour.com\n*/\n',
      },
			dev: {
				src: ['development/src/js/scripts.js'], 
      	dest: projectFiles.jsFiles.dest.dev
			},
      dist: {
        src: ['development/src/js/temp/scripts.min.js'], 
        dest: 'www-root/assets/js/scripts.min.js'
      }
    },//concat
    sass: {
			dist: {
				options: {
    		  style: 'expanded',
    		},//options
    		files: {
    		  'www-root/assets/css/print.css': 'development/src/sass/print.scss',
    		  'www-root/assets/css/style.css': 'development/src/sass/style.scss',
    		}//files
			}
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
          cleanup: true
        },
        default: {
          files: {
            'www-root/assets/media/svg/bc-icons.svg': ['development/src/media/icons/*.svg'],
          },
        },
    },
    includereplace: {
			dist: {
				options: {
					includesDir: 'development/src/html/includes'
				},
				files: [
					{src: '**/*.html', dest: 'www-root/', expand: true, cwd: 'development/src/html/'}
				]	
			}
    	
    },//includereplace
    
    copy: {
      media: {
        files: [
          {expand: true, cwd: 'development/src/media/', src: ['**/*'], dest: 'www-root/assets/media/', filter: 'isFile'}
        ]
      }//main
    },//copy

    watch: {
      options: { livereload: true },
      sass: {
        files: ['development/**/**/*.scss'],
        //Uncomment the line below and delete the other tasks line to add csslint into the project
        //tasks: ['sass:dist','csslint:strict']
        tasks: ['sass']
      },//sass
      scripts: {
				files: ['development/src/js/scripts.js'],
       	//Uncomment the line below and delete the other "tasks:['uglify:build'] to add JSHint into the project"
       	//tasks: ['jshint','uglify:build']
       	tasks: ['concat:dev']
      },//scripts

      htmlcompile: {
        files: ['development/src/html/**/*.html'],
        tasks: ['includereplace:dist']
      },//htmlcompile
      media: {
          files: ['development/src/media/**/*.*'],
          tasks: ['copy:media']
      },
			svg: {
				  files: ['development/src/media/icons/*.svg'],
          tasks: ['svgstore']
			}

    }//watch
  });

  // Default task(s).
  grunt.registerTask('default', ['server']);
  grunt.registerTask('server', [
    'express',
    'watch'
  ]);
	grunt.registerTask('build', [
		'includereplace',
		'sass',
    'run:jshint',
		'run:babel',
		'run:uglify',
		'concat:dist'
  ]);

};