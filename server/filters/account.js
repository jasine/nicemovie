'use strict';

var authorizeFilter=function (req,res,next) {
	if (!req.session.user) {
    	res.redirect('/account/login');
  	} else {
    	next();
  	}
};

var cookieUserFilter=function (req,res,next) {
	if (req.session.user) {
		res.locals.user=req.session.user;
  	}
	if(req.session.cookie.expires){
		//每次访问都把cookie过期时间后推1小时
		req.session.cookie.expires=new Date(Date.now() + 60* 60 * 1000);
	}
	next();
};


module.exports={
	authorize:authorizeFilter,
	cookieUser:cookieUserFilter
};