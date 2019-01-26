module.exports = function(grunt) {

	const tasks = {scope: ['devDependencies', 'dependencies' ]};
  const options = {
		pkg: grunt.file.readJSON('package.json'),
		paths: {
			jsFiles: {
				src: ['development/src/js/scripts.js'],
				dest: {
					dev: 'www-root/assets/js/scripts.js',
					dist: 'www-root/assets/js/scripts.min.js'
				},
				tempPaths: {
					min: 'development/src/js/temp/scripts.min.js',
					unmin: 'development/src/js/temp/scripts.js'
				}
			}
		},
		config: { 
			src: 'config/*.js' 
		}
	};
  const configs = require('load-grunt-configs')(grunt, options);
  require('load-grunt-tasks')(grunt, tasks);
  grunt.initConfig(configs);
	
		
  //Uncomment the line below to add HTML Validation to the project
  //  grunt.loadNpmTasks('grunt-html-validation');

  //Uncommment the line below to add JSHint into the project (Ctrl+f to find all regions needed to be uncommented in order to add in JSHint)
  //grunt.loadNpmTasks('grunt-contrib-jshint');

  //Uncomment the line below to add csslint to the project (Ctrl+f to find all regions needed to be uncommented in order to add in csslint)
  //grunt.loadNpmTasks('grunt-contrib-csslint');
  
	

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

}