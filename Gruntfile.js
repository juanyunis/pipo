module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jslint: { // configure the task
      // lint your project's server code
      server: {
        src: [
          '*.js',
          'server/routes/*.js',
          'server/js/**/*.js',
          'server/models/*.js'
        ],
        exclude: [
        ],
        directives: { // example directives
          node: true,
          indent: 2,
          todo: true
        },
        options: {
          edition: 'latest', // specify an edition of jslint or use 'dir/mycustom-jslint.js' for own path
          junit: 'out/server-junit.xml', // write the output to a JUnit XML
          log: 'out/server-lint.log',
          jslintXml: 'out/server-jslint.xml',
          errorsOnly: true, // only display errors
          failOnError: false, // defaults to true
          checkstyle: 'out/server-checkstyle.xml' // write a checkstyle-XML
        }
      },
      // lint your project's client code
      client: {
        src: [
          'public/js/*.js'
        ],
        directives: {
          browser: true,
          indent: 2,
          predef: [
            'jQuery'
          ]
        },
        options: {
          junit: 'out/client-junit.xml'
        }
      }
    },

    electron: {
      osxBuild: {
        options: {
          NODE_ENV: 'production',
          name: 'PiPo',
          dir: '.',
          out: 'dist',
          version: '0.36.5',
          platform: 'darwin',
          icon: 'public/img/pipo.icns',
          arch: 'x64',
          ignore: []
        }
      }
    },

    clean: {
      build: ["out", "pipo.log"],
      release: ["dist"]
    }

    //cleanall: {
    //  clean: {
    //    build: ["out", "pipo.log"],
    //    release: ["dist"],
    //    modules: ["node_modules"]
    //  }
    //}
  });



  grunt.registerTask('default', 'Default task', ['lint']);
  grunt.registerTask('build', 'Build for Electron', ['electron']);
  grunt.registerTask('cleanall', 'Clean build files', ['clean']);
  grunt.registerTask('cleanrelease', 'Clean release files', ['cleanrelease']);
  //grunt.registerTask('cleanall', 'Clean all files', ['cleanall']);
  grunt.registerTask('lint', 'Run linting', ['jslint']);
};
