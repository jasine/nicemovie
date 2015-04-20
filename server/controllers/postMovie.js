'use strict';
var Movie=require('../models/movie');
var _=require('underscore');
var postMovieController = function(req, res) {
	var id=req.body.movie._id;
	var movieObj=req.body.movie;
	var _movie
	if(id!==''){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err);
			}
			_movie=_.extend(movie,movieObj);
			_movie.save(function(err,movie){
				if(err){
					console.log(err);
				}
				res.json({result:'ok',_id:movie._id});
				//-res.json()
			})
		})
	}
	else{
		_movie=new Movie({
			_title:movieObj._title,
			_directer: movieObj._directer,
			_desp:movieObj._desp,
			_country:movieObj._country,
			_img:movieObj._img,
			_summary:movieObj._summary,
			_date:movieObj._date
		});

		_movie.save(function(err,movie){
				if(err){
					console.log(err);
				}
				res.json({result:'ok',_id:movie._id});
			});
	}
};

module.exports = {
  postMovie: postMovieController
};
