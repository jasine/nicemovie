/// <reference path="../../typings/node/node.d.ts"/>
/**
 * User Routes
 */

'use strict';

//controllers
var indexController = require('../controllers/index');
var listController= require('../controllers/list');
var adminController = require('../controllers/admin');
var aboutController=require('../controllers/about');
var accountController = require('../controllers/account');

//filters
var accountFilter = require('../filters/account');

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
  
  //为所有请求添加读取user的filter
  app.get('*',accountFilter.cookieUser);
  app.post('*',accountFilter.cookieUser);

  
  
  // Home
  app.get('/', indexController.index);
  // List
  app.get('/list',listController.list);
  //About
  app.get('/about',aboutController.about);
  
  
  //Admin
  app.get('/admin',accountFilter.authorize,adminController.admin);

  app.get('/admin/movie/:id',accountFilter.authorize, adminController.getMovie);
  app.post('/admin/movie/', accountFilter.authorize,adminController.postMovie);
  app.delete('/admin/movie/:id',accountFilter.authorize, adminController.deleteMovie);

  //Login
  app.get('/account/login/', accountController.loginGet);
  app.post('/account/login/', accountController.loginPost);
  
  //Logout
  app.get('/account/logout',accountController.logout);
  
   //Signup
  app.get('/account/signup/', accountController.signupGet);
  app.post('/account/signup/', accountController.signupPost);
};



module.exports = routes;
