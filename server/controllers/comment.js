/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/express/express.d.ts""/>
/// <reference path="../../typings/underscore/underscore.d.ts""/>
var Comment = require('../models/comment');

var addCommentController=function (req,res) {
	var _comment=req.body.comment;
	if(_comment.cid){
		Comment.findById(_comment.cid,function (err,comment) {
			var reply={
				from:_comment.from,
				to:_comment.tid,
				content:_comment.content,
				time:Date.now()
			};
			comment.reply.push(reply);
			comment.save(function name(err,comment) {
				if(err){
					res.redirect('/error');
				}else{
					res.redirect('/detail/'+_comment.movie);
				}
			});
			
		});
	}else{
		var comment=new Comment(_comment);
		comment.save(function (err,comment) {
			if(err){
				console.log(err);
				res.redirect('/error');
			}
			res.redirect('/detail/'+_comment.movie);		
		});
	}	
};
module.exports={
	addComment:addCommentController
};