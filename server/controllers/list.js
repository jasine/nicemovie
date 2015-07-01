'use strict';
var Movie=require('../models/movie');
var listController=function (req,res) {	
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		else{
			res.render('list',{
				title:"电影列表",
				movies:movies,
				env: process.env.NODE_ENV || 'development'
			});
		}
	});		
};

module.exports ={
	list:listController
};