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
      demo: {
        options: {
          style: 'expanded',
          sourcemap: 'none'
        },
        files: {
          'demo/demo.css': 'demo/demo.sass'
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
        tasks: ['sass:dev', 'sass:demo']
      },
      jshint: {
        files: 'src/mediaquery.js',
        tasks: ['jshint']
      },
      shell: {
        files: 'src/mediaquery.js',
        tasks: ['shell:test_large_viewport', 'shell:test_small_viewport']
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/mediaquery.min.js': ['src/mediaquery.js']
        }
      },
      demo: {
        files: {
          'demo/mediaquery.min.js': ['src/mediaquery.js']
        }
      }
    },

    'http-server': {
      'demo': {
        root: 'demo',
        port: 8888
      }
    }
  });

  //grunt.registerTask('default', 'watch SASS, Jshint and test', ['watch:sass', 'watch:jshint', 'watch:shell']);
  grunt.registerTask('default', 'watch SASS, Jshint and test', ['watch']);
  grunt.registerTask('test', 'test mediaquery.js using a headless browser', ['shell:test_large_viewport', 'shell:test_small_viewport']);
  grunt.registerTask('demo', 'run a local webserver', ['sass:demo', 'uglify:demo', 'http-server:demo']);
  grunt.registerTask('dist', 'minimize JS', ['uglify:dist']);
}
