module.exports = {
  media: {
    files: [
      {expand: true, cwd: '<%= paths.media.src %>', src: ['**/*'], dest: '<%= paths.media.dest %>', filter: 'isFile'}
    ]
  }//main
}