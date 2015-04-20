'use strict';
var Movie=require('../models/movie');
var deleteMovieController = function(req, res) {
	var id=req.params.id;	
	console.log(id);
	if(id){
		Movie.remove({_id:id},function(err,movie){
			if(err){
				console.log(err);
			}
			else{
				res.json({result:'ok'})
			}			
		})
	}
	else{
		res.json({result:'error'});
	}
};

module.exports = {
  deleteMovie: deleteMovieController
};
