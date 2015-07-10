// Configuration for jade task(s)
// Compile jade templates into HTML
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('jade', {
    dist: {
      options: {
        pretty: true,
        client: false,
        data: {
          debug: false,
          env: 'development',
          movies:[{_img:"/images/fast7-2.jpg",_directer:"xxx",_title:"速度与激情7",_desp:"我们只在乎“家”",_country:"#",_date:"2014/4/2",_summary:"@@@"},{_img:"/images/game.png",_directer:"xxx",_title:"权利的游戏",_desp:"冰与火才是永恒的主题",_country:"#",_date:"2014/4/2",_summary:"@@@"},{_img:"/images/bat.jpg",_directer:"xxx",_title:"蝙蝠侠",_desp:"黑暗骑士崛起",_country:"#",_date:"2014/4/2",_summary:"@@@"}],
          title:'好电影',
          user:'testuser',
          movie:'testmovie',
          comment:{reply:[]},
        }
      },
      expand: true,
      cwd: '<%= yeogurt.server %>/templates/',
      dest: '<%= yeogurt.tmp %>/',
      src: ['**/*.jade'],
      ext: '.html'
    },
  });

};

module.exports = taskConfig;
