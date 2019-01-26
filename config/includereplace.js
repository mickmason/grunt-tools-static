module.exports =  {
	dist: {
		options: {
			includesDir: 'development/src/html/includes'
		},
		files: [
			{src: '**/*.html', dest: 'www-root/', expand: true, cwd: 'development/src/html/'}
		]	
	} 	
}