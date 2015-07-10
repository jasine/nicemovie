/// <reference path="../../typings/mongoose/mongoose.d.ts" />
'use strict';
var mongoose=require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var MovieSchema=new mongoose.Schema({
	_title:String,
	_directer:String,
	_country:String,
	_desp:String,
	_date:String,
	_img:String,
	_summary:String,
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
MovieSchema.pre('save',function(next){
	if(this.isNew){
		this._meta._createAt=this._meta._updateAt=Date.now();
	}
	else{
		this._meta._updateAt=Date.now();
	}
	next();
});

MovieSchema.statics={
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

//添加分页插件
MovieSchema.plugin(mongoosePaginate);

module.exports=MovieSchema;