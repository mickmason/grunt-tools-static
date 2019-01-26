module.exports = {
			options: {
				failOnError: true
			},
			jshint: {
				cmd: 'npx',
				args: ['jshint', '<%= paths.jsFiles.src %>']
			},
			babel: {
				cmd: 'npx',
				args: ['babel', '<%= paths.jsFiles.src %>', '--out-dir', '<%= paths.jsFiles.tempPaths.unmin %>']
			},
			uglify: {
				cmd: 'npx',
				args: ['uglifyjs', '<%= paths.jsFiles.tempPaths.unmin %>scripts.js', '-o',  '<%= paths.jsFiles.tempPaths.min %>scripts.min.js', '-m']
			}
} 