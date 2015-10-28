module.exports = (function () {
  var self = {
    //members
    index: function (req, res, next) {
      return res.render('app', {
        layout: 'layouts/main',
        authenticated: req.user != null
      });
    },
    testIndex: function (req, res, next) {
      return res.render('test', {
        layout: 'layouts/main',
        authenticated: req.user != null
      });
    },
    bind: function (options) {
      var app = options.app;
      app.get('/app**/*', self.index);
      app.get('/test**/*', self.testIndex);
    }
  };
  return self;
})();
