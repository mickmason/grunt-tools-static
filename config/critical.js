module.exports = {
	dist: {
		options: {
			dimensions: [{
				width: 360,
				height: 640
		  },
		  {
				width: 1366,
				height: 768
		  },
			{
				width: 1440,
				height: 900
			},
			{
				width: 1920,
				height: 1080
			}],
			extract: true,
			inline: true
		},
		files: [
			{src: '<%= paths.html.dest %>index.html', dest: '<%= paths.html.dest %>index.html'}
		]
	}
}