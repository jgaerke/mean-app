module.exports = (function() {
  var self = {
    //locals
    accountSvc: require('../../services/AccountService'),

    //members
    exec: function (req, res, next) {
      try {
        var account, user, errors;

        account = new Account(req.body);
        errors = account.getErrors();

        if (errors && errors.length) {
          return res.status(400).json({status: 400, message: 'invalid account.'});
        }

        user = self.accountSvc.authenticate(account.email, account.password);

        if(!user) {
          return res.status(401).json({status: 200, message: 'Invalid account'});
        }

        self.accountSvc.setAuthCookie(user.aid, account.rememberMe, res);
        user = new Account(user).toPublicObject();
        res.json({status: 200, message: 'Valid account', data: user });

        next();

      } catch (e) {
        console.log(e);
        return res.status(500).json({status: 500, message: 'error validating account.'});
      }
    }
  };
  return self;
})();
