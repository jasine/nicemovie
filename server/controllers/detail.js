/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/express/express.d.ts""/>
/// <reference path="../../typings/underscore/underscore.d.ts""/>

var Movie = require('../models/movie');
var Comment = require('../models/comment');
var User = require('../models/user');

var getDetailController=function (req,res) {
	var id = req.params.id;
    
    Movie.findById(id, function(err, movie) {
        if (err) {
            console.log(err);
            res.redirect('/notfound');
        }else {
            Comment
            .find({movie: id})
            .populate('from', 'name')
            .populate('reply.from reply.to', 'name')
            .sort({'_meta._createAt':'asc'})
            .exec(function(err, comments) {
                res.render('detail', {
                    title:movie._title+' | 好电影',
                    movie: movie,
                    comments: comments,
                    env: process.env.NODE_ENV || 'development'
                });
            });           
        }
    });
};

module.exports={
	getDeatil:getDetailController
};