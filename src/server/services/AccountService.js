module.exports = authSvc = (function () {
  var self = {
    //locals
    uuid: require('node-uuid'),
    cryptoSvc: require('./CryptoService'),
    dataSvc: require('./DataService'),

    //members
    setAuthCookie: function (aid, persist, res) {
      var cookieSettings = {path: '/', httpOnly: true};
      if (persist)
        cookieSettings.maxAge = 604800000;
      res.cookie('aid', aid, cookieSettings);
    },
    clearAuthCookie: function (res) {
      res.clearCookie('aid');
    },
    removeAidFromUser: function(user) {
      if(!user) {
        return;
      }
      self.dataSvc.update('accounts', { _id: user._id }, { $unset: { aid: "" } });
    },
    authenticate: function (email, password) {
      var passwordHash, user;

      user = self.dataSvc.findOne('accounts', {email: email});
      if (!user) {
        return;
      }
      passwordHash = self.cryptoSvc.getSecureHash(password);
      if (passwordHash !== user.passwordHash) {
        return;
      }

      user.aid = self.uuid.v1();
      self.dataSvc.update('accounts', { _id: user._id }, { $set: { aid: user.aid } });

      return user;
    }
  };

  return self;
})();