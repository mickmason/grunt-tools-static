module.exports = {
	dist: {
		options: {
  		  style: 'expanded',
  		},//options
  		files: {
  		  'www-root/assets/css/print.css': 'development/src/sass/print.scss',
  		  'www-root/assets/css/style.css': 'development/src/sass/style.scss',
  		}//files
	}
}