module.exports = (function () {
  var self = {
    //members
    index: function (req, res, next) {
      return res.render('home', {
        layout: 'layouts/site'
      });
    },
    bind: function (options) {
      var app = options.app;
      app.get('/', self.index);
    }
  };
  return self;
})();
