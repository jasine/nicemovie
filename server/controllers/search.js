/// <reference path="../../typings/node/node.d.ts"/>

'use strict';
var Movie = require('../models/movie');
var mongoosePaginate = require('mongoose-paginate');

var searchController = function (req, res) {
	var keywords = req.query.keywords;
	var page=req.query.page||1;
	console.log(keywords);
	if (keywords) {
		Movie.paginate({ _title: new RegExp(keywords + '.*', 'i') },//为keywords加正则表达式实现模糊搜索
			{
				page: page,
				limit: 5//设置每页个数
			},
			function (err, results,pageCount,itemCount) {
				if (err) {
					console.log(err);
				}
				else {
					res.render('searchresult', {
						title: "搜索结果",
						results: results,
						keywords: keywords,
						page:page,
						pageCount:pageCount,
						itemCount:itemCount,
						env: process.env.NODE_ENV || 'development'
					});
				}
			});
	} else {
		res.render('search', {
			title: "搜索",
			env: process.env.NODE_ENV || 'development'
		});
	}	
	
};

module.exports = {
	search: searchController
};