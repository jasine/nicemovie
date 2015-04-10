/**
 * Index Controller
 */

'use strict';

var indexController = function(req, res) {
  res.render('index', {
    title: 'Home',
    items:[{img:"/images/fast7-2.jpg",title:"Fast and Furious",desp:"Game of Man",addr:"#"},{img:"/images/game.png",title:"Game of Throne",desp:"......",addr:"#"},{img:"/images/bat.jpg",title:"Bat Man",desp:"Game of Man",addr:"#"}],
    env: process.env.NODE_ENV || 'development'
  });
};

module.exports = {
  index: indexController
};
