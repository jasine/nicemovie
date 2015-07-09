var notFoundController=function (req,res) {
	//写状态码
	res.status(404);
	res.render('notfound',{
		title:"页面未找到",
		env: process.env.NODE_ENV || 'development'
	});
};

var errorController=function (req,res) {
	//写状态码
	res.status(500);
	res.render('error',{
		title:"错误",
		env: process.env.NODE_ENV || 'development'
	});
};

module.exports={
	notFound:notFoundController,
    error:errorController
};