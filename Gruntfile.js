module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),
      concurrent: {
        target: {
          tasks: ["watch:compass", "watch:jsmin"],
          options:{
            logConcurrentOutput: true
          }
        }
      },
      compass: {
        dist:{
          options: {
            config: 'config.rb'
          }
        }
      },
      autoprefixer: {
        target: {
          // Target-specific file lists and/or options go here. 
          src: 'css/style.css',
          dist: 'css/style.css'
        }
      },
      cssmin: {
        target: {
          files: {
            'css/style.min.css': ['css/style.css']
          }
        }
      },
      uglify: {
        target: {
          files: {
            'js/script.min.js': ['js/script.js']
          }
        }
      },
      watch:{
        compass:{
          files: 'sass/*.scss',
          tasks: ['compass:dist', 'autoprefixer:target', 'cssmin:target']
        },
        jsmin:{
          files: 'js/script.js',
          tasks: ['uglify']
        }
      }
    }); 
    // Default task(s).
    grunt.registerTask('default', ['watch']);

    
  };