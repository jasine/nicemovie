// Configuration for JSLHint task(s)
// Runs JSHint on specified files
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('mochaTest', {
    options: {
      reporter: 'spec'
    },
    src:['test/**/*.*']
  });

};

module.exports = taskConfig;
