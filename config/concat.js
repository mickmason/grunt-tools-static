module.exports =  {
  options: {
     banner: '\n/** \n * Big Cat Digital custom and concatenated library scripts \n * Client: <%= pkg.clientName %>\n * Project: <%= pkg.projectName %>\n * Version: <%= pkg.version %>\n * Description: <%= pkg.description %>\n * Copyright <%= grunt.template.today("yyyy") %>\n * Created by <%= pkg.developer %> * \n **/\n\n'
  },
	dev: {
		src: ['<%= paths.jsFiles.src %>'], 
    dest: '<%= paths.jsFiles.dest.dev %>'
	},
  dist: {
    src: ['<%= paths.jsFiles.tempPaths.min %>'], 
    dest: '<%= paths.jsFiles.dest.dist %>'
  }
}