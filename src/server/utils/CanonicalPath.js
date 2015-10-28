module.exports = function(req, res, next) {
  if(req.path == '/app') {
    return res.redirect(302, '/app/');
  }
  next();
}