module.exports = (function() {
  var self = {
    //locals
    accountSvc: require('../../services/AccountService'),

    //members
    exec: function (req, res, next) {
      self.accountSvc.removeAidFromUser(req.user)
      self.accountSvc.clearAuthCookie(res);
      res.json({successful: true});
      next();
    }
  };
  return self;
})();
