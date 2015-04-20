'use strict'
var Movie=require('../models/movie');

var adminController=function (req,res) {	
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		else{
			res.render('admin',{
				title:"好电影-管理",
				movies:movies,
				env: process.env.NODE_ENV || 'development'
			})
		}
	})	
}

module.exports ={
	admin:adminController
}