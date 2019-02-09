module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-html-convert');
  grunt.initConfig({
    htmlConvert: {
      options: {
        // custom options, see below
        base:'public/templates'
      },
      templates: {
        src: ['public/templates/*.handlebars'],
        dest: 'public/tmp/templates.js'
      },
    },
  })

  grunt.registerTask('handlebars', ['htmlConvert'])
};
