/**
 * Index Controller
 */
'use strict';
var Movie=require('../models/movie');

var indexController = function(req, res) {
	Movie.fetchTop(function(err,movies){
		if(err){
			console.log(err);
		}
		else{
			res.render('index',{
				title:"好电影",
				movies:movies,
				env: process.env.NODE_ENV || 'development'
			})
		}
	});		
}
module.exports = {
  index: indexController
};
