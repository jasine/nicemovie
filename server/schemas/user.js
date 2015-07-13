/// <reference path="../../typings/mongoose/mongoose.d.ts" />
/// <reference path="../../typings/bcrypt/bcrypt.d.ts" />
var mongoose = require('mongoose');
var bcrypt=require('bcrypt');
var UserSchema=new mongoose.Schema({
  mail:{
    unique:true,
    type:String
  },
  name:String,
  password:String,
  head:String,
  _meta: {
    _createAt: {
      type: Date,
      default: Date.now()
    },
    _updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});


//数据每次更新都调用
UserSchema.pre('save', function (next) {
  var user=this;
  if (this.isNew) {
    this._meta._createAt = this._meta._updateAt = Date.now();
  }
  else {
    this._meta._updateAt = Date.now();
  }
  bcrypt.genSalt(10,function (err,salt) {
    if(err) return next(err);
    
    bcrypt.hash(user.password,salt,function (err,hash) {
      if(err) return next(err);
      user.password=hash;
      next();
    });
  });


});

//静态方法
UserSchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      //.sort({'_meta._updateAt': 'desc'})
      .exec(cb);
  },
  findById: function (_id, cb) {
    return this
      .findOne({_id: _id})
      .exec(cb);
  },
  fetchTop: function (cb) {
    return this
      .find({})
      .limit(3)
      .sort({'_meta._updateAt': 'desc'})
      .exec(cb);
  },
};

//实例方法
UserSchema.methods={
  comparePassword:function (password,cb) {
    bcrypt.compare(password,this.password,function (err,isMatch) {
      if(err) 
        return cb(err);
      cb(null,isMatch);     
    });
  }
};

module.exports = UserSchema;
