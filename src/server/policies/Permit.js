module.exports = (function() {
  var self = {
    //locals

    //members
    exec: function(req, res, next) {
      try {
        next();
      } catch(e) {
        return res.status(500).json({status: 500, message: 'error in permission policy.'});
      }
    },
    bind: function (options) {
      var app = options.app;
      app.use(self.exec);
    }
  };

  return self;
})();