module.exports = (function () {
  var self = {
    //locals
    dataSvc: require('../services/DataService'),

    //members
    exec: function (req, res, next) {
      var user;

      try {
        req.user = null;

        if (!req.cookies.aid)
          return next();

        user = self.dataSvc.findOne('accounts', {aid: req.cookies.aid});
        if (user) {
          req.user = user;
        }
        next();
      } catch (e) {
        return res.status(500).json({status: 500, message: 'error in authenticate policy.'});
      }
    },
    bind: function (options) {
      var app = options.app;
      app.use(self.exec);
    }
  };

  return self;
})();