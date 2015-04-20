/**
 * User Routes
 */

'use strict';

var indexController = require('../controllers/index');
var listController= require('../controllers/list');


var adminController=require('../controllers/admin')

var getMovieController= require('../controllers/getMovie');
var postMovieController=require('../controllers/postMovie')
var deleteMovieController=require('../controllers/deleteMovie')



var path = require('path');
var fs = require('fs');

var routes = function(app) {

  // Dynamically load all routes
  fs.readdirSync(__dirname).forEach(function(file) {
    // Dont load this index.js file
    if (!/index/.test(file)) {
      var route = path.join(__dirname, file);
      require(route)(app);
    }
  });

  // Home
  app.get('/', indexController.index);
  // List
  app.get('/list',listController.list);


  //Admin
  app.get('/admin',adminController.admin);

  app.get('/admin/movie/:id',getMovieController.getMovie);
  app.post('/admin/movie/',postMovieController.postMovie);
  app.delete('/admin/movie/:id',deleteMovieController.deleteMovie);


};

module.exports = routes;
