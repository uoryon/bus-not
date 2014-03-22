
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: '公交不過站' });
};
