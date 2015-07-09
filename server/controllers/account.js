/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/express/express.d.ts""/>
/**
 * Created by jasine on 15/4/28.
 */
 "user strict";
var User=require('../models/user')

//登陆
var loginGetController = function (req, res) {

  var referer=req.headers['referer'];
  if(referer&&referer.indexOf('/account/signup', this.length - '/account/signup'.length) !== -1){
    referer=undefined;
  }
  res.render('login', {
    title: "登陆",  
    message:"",
    visibility:'hidden',
    referer:referer,
    env: process.env.NODE_ENV || 'development'
  });
};

var loginPostController = function (req, res) {
  User.findOne({mail:req.body.user.mail},function (err,user) {
    if(err){
      console.log(err);
    }
    if(user){
          user.comparePassword(req.body.user.password,function (err,isMatch) {
            if(err){
              console.log(err);
            }
            if(isMatch){
              //存session
              req.session.user=user;
              if(req.body.remerber!='true'){
                //如果不点remeberme,cookier过期时间为1小时
                req.session.cookie.expires=new Date(Date.now() + 60* 60 * 1000);
              }
              if(req.body.referer){
                res.redirect(req.body.referer);
              }else{
                res.redirect('/admin/');
              }
            }
            else{
              res.render('login', {
                title: "登陆",  
                message:"密码错误",
                visibility:"show",
                env: process.env.NODE_ENV || 'development'
              });
            }
      });
    }
    else{
      res.render('login', {
                title: "登陆",
                visibility:"show",  
                message:"用户不存在",
                env: process.env.NODE_ENV || 'development'
              });
    }
  });
};



//注册
var singnupGetController = function (req, res) {
  res.render('signup', {
    title: "注册",  
    message:"",
    visibility:'hidden',
    env: process.env.NODE_ENV || 'development'
  });
};

var signupPostController = function (req, res) {
  console.log(req.body);

  User.findOne({mail:req.body.user.mail},function (err,user) {
    if(err){
      console.log(err);
    }
    if(user){
      res.render('signup',{
        env: process.env.NODE_ENV || 'development',
        visibility:'show',
        message:"用户已存在"
      });
    }
    else{
      var newUser=new User(req.body.user);
      newUser.save(function (err,newUser) {
      if(err)
      console.log(err);   
      });
      res.redirect('/account/login');
    }    
  });

  // res.render('login',{
  //   env: process.env.NODE_ENV || 'development',
  //   mail:req.body.user.mail
  // });
  
};

//退出

var logoutController=function (req,res) {
  delete req.session.user;
  delete res.locals.user;
  res.redirect(req.headers['referer']);
};

module.exports = {
  loginGet: loginGetController,
  loginPost: loginPostController,
  signupGet:singnupGetController,
  signupPost:signupPostController,
  logout:logoutController
};
