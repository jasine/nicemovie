'use strict';
var aboutController=function (req,res) {
	res.render('about',{
		title:"关于",
		env: process.env.NODE_ENV || 'development'
	});
};

module.exports={about:aboutController};