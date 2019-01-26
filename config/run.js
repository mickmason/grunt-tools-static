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
				args: ['babel', '<%= paths.jsFiles.src %>', '--out-dir', '<%= paths.jsFiles.tempPath %>']
			},
			uglify: {
				cmd: 'npx',
				args: ['uglifyjs', '<%= paths.jsFiles.tempPaths.unmin %>', '-o',  '<%= paths.jsFiles.tempPaths.min %>', '-m']
			}
} 