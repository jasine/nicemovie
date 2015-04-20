'use strict'
var Movie=require('../models/movie');
var getMovieController=function (req,res) {	
	var id=req.params.id;	
	var _movie
	if(id){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err);
				res.json({result:err});
			}
			else{
				res.json({movie:movie})
			}	
		})
	}
	else{
		res.json({result:'error:id do not exist'});
	}
}

module.exports ={
	getMovie:getMovieController
}