/// <reference path="../../typings/mongoose/mongoose.d.ts" />
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types;
var CommentSchema=new mongoose.Schema({
	movie:{
		type:ObjectId,
		ref:'Movie'
	},
	from:{
		type:ObjectId,
		ref:'User'
	},
	to:{
		type:ObjectId,
		ref:'User'
	},
	content:String,
	reply:[{
		from:{
			type:ObjectId,
			ref:"User"
		},
		to:{
			type:ObjectId,
			ref:"User"
		},
		content:String,
		time:{
			type:Date,
			default:Date.now()
		}
	  }
	],
	_meta:{
		_createAt:{
			type:Date,
			default:Date.now()
		},
		_updateAt:{
			type:Date,
			default:Date.now()
		}
	}
});

//数据每次更新都调用
CommentSchema.pre('save',function(next){
	if(this.isNew){
		this._meta._createAt=this._meta._updateAt=Date.now();
	}
	else{
		this._meta._updateAt=Date.now();
	}
	next();
});

CommentSchema.statics={
	fetch:function(cb){
		return this
		.find({})
		.sort({'_meta._updateAt':'desc'})
		.exec(cb);
	},
	findById:function(_id,cb){
		return this
		.findOne({_id:_id})
		.exec(cb);
	},
	fetchTop:function(cb,count){
		return this
		.find({})
		.limit(3)
		.sort({'_meta._updateAt':'desc'})
		.exec(cb);
	}
};

module.exports=CommentSchema;