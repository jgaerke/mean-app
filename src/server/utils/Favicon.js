module.exports = function (req, res, next) {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'});
    return res.end();
  }
  if (next)
    next();
};