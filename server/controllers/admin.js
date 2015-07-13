/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/express/express.d.ts""/>
/// <reference path="../../typings/underscore/underscore.d.ts""/>
'use strict';
var Movie = require('../models/movie');
var _ = require('underscore');


var adminController = function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        } else {
            res.render('admin', {
                title: "好电影-管理",
                movies: movies,
                env: process.env.NODE_ENV || 'development'
            });
        }
    });
};


var getMovieController = function(req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err);
                res.json({
                    result: err
                });
            } else {
                res.json({
                    movie: movie
                });
            }
        });
    } else {
        res.json({
            result: 'error:id do not exist'
        });
    }
};


var postMovieController = function(req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if(req._img){
        movieObj._img=req._img;//有上传文件数据
    }else{
        if(req.body.webimg){
            movieObj._img=req.body.webimg;//有上传文件数据
        }
    }
    
    if (id) {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err);
            }
            _movie = _.extend(movie, movieObj);
            _movie.save(function(err, movie) {
                if (err) {
                    console.log(err);
                }
                res.json({
                    result: 'ok',
                    _id: movie._id
                });
                //-res.json()
            });
        });
    } else {
        _movie = new Movie({
            _title: movieObj._title,
            _directer: movieObj._directer,
            _desp: movieObj._desp,
            _country: movieObj._country,
            _img: movieObj._img,
            _summary: movieObj._summary,
            _date: movieObj._date
        });

        _movie.save(function(err, movie) {
            if (err) {
                console.log(err);
            }
            res.json({
                result: 'ok',
                _id: movie._id
            });
        });
    }

};

var deleteMovieController = function(req, res) {
    var id = req.params.id;
    console.log(id);
    if (id) {
        Movie.remove({
            _id: id
        }, function(err) {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    result: 'ok'
                });

            }
        });
    } else {
        res.json({

            result: 'error'
        });
    }
};

module.exports = {
    admin: adminController,
    postMovie: postMovieController,
    deleteMovie: deleteMovieController,
    getMovie: getMovieController
};
