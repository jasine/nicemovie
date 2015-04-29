/**
 * Created by jasine on 15/4/28.
 */
var getController = function (req, res) {
  res.render('login', {
    title: "登陆",
    env: process.env.NODE_ENV || 'development'
  });
};

var postController = function (req, res) {
  console.log(req.body);

  res.redirect('/admin/');
};

module.exports = {
  get: getController,
  post: postController
};
