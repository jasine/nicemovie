// Configuration for Copy task(s)
// Copies specified folders/files to specified destination
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('copy', {
    dist: {
      files: [{
        expand: true,
        cwd: '<%= yeogurt.client %>/',
        dest: '<%= yeogurt.dist %>/client/',
        src: [
          'images/**/*.{webp}',
          '!*.js',
          '*.{ico,png,txt}'
        ]
      }, {
        expand: true,
        cwd: './',
        dest: '<%= yeogurt.dist %>/',
        src: [
          '<%= yeogurt.server %>/**/*',
          'server.js',
          'package.json'
        ]
      },
      {
        expand: true,
        cwd: '<%= yeogurt.client %>/',
        dest: '<%= yeogurt.dist %>/client/fonts',
        flatten: true,//汇总
        src: [
          '**/*.{woff,otf,ttf,eot,svg,woff2}' 
        ]
      },
      {
        expand: true,
        cwd: '<%= yeogurt.client %>/uploads/',
        dest: '<%= yeogurt.dist %>/client/uploads/',
        src: [
          '**/*.*' 
        ]
      }
      ]
    }
  });

};

module.exports = taskConfig;
