module.exports = {
      options: { livereload: true },
      sass: {
        files: ['development/**/**/*.scss'],
        //Uncomment the line below and delete the other tasks line to add csslint into the project
        //tasks: ['sass:dist','csslint:strict']
        tasks: ['sass']
      },//sass
      scripts: {
				files: ['<%= paths.jsFiles.src %>'],
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