// Configuration for Clean task(s)
// Deletes specified folders/files
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('clean', {
    dist: ['<%= yeogurt.dist %>'],
    tmp: ['<%= yeogurt.tmp %>'],
    cache:['<%= yeogurt.client %>/uploads/cache/*']
  });

};

module.exports = taskConfig;
