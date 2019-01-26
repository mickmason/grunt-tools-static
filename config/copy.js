module.exports = {
  media: {
    files: [
      {expand: true, cwd: 'development/src/media/', src: ['**/*'], dest: 'www-root/assets/media/', filter: 'isFile'}
    ]
  }//main
}