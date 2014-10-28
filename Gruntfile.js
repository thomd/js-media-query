"use strict";

module.exports = function(grunt){

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dev: {
        options: {
          style: 'expanded',
          sourcemap: 'none'
        },
        files: {
          'test/main.css': 'test/main.sass'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'test/main.css': 'test/main.sass'
        }
      }
    },

    jshint: {
      files: ['mediaquery.js'],
      options: {
        reporter: require('jshint-stylish'),
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },

    shell: {
      test_large_viewport: {
        command: './node_modules/mocha-phantomjs/bin/mocha-phantomjs -v 1200x500 test/large.html'
      },
      test_small_viewport: {
        command: './node_modules/mocha-phantomjs/bin/mocha-phantomjs -v 400x500 test/small.html'
      }
    },

    watch: {
      sass: {
        files: '**/*.sass',
        tasks: ['sass:dev']
      },
      jshint: {
        files: 'mediaquery.js',
        tasks: ['jshint']
      },
      shell: {
        files: 'mediaquery.js',
        tasks: ['shell:test_large_viewport', 'shell:test_small_viewport']
      }
    }
  });

  grunt.registerTask('default', ['sass:dev', 'watch']);
  grunt.registerTask('test', ['shell:test_large_viewport', 'shell:test_small_viewport']);
}
