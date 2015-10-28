module.exports = (function () {
  var self = {
    //locals
    uuid: require('node-uuid'),
    dataSvc: require('../../services/DataService'),
    cryptoSvc: require('../../services/CryptoService'),
    accountSvc: require('../../services/AccountService'),

    //members
    exec: function (req, res, next) {
      try {
        var details, account, errors;

        details = new Account(req.body);
        errors = details.getErrors();

        if (errors && errors.length) {
          return res.status(400).json({status: 400, message: 'invalid account.'});
        }

        if (self.dataSvc.count('accounts', {email: details.email}) > 0) {
          return res.status(409).json({status: 409, message: 'email taken.'})
        }

        account = new Account(details.toObject());
        account.passwordHash = self.cryptoSvc.getSecureHash(details.password);
        account = account.toObject();
        account.aid = self.uuid.v1();
        delete account.password;
        delete account.passwordConfirm;
        account = self.dataSvc.create('accounts', account);

        self.accountSvc.setAuthCookie(account.aid, account.rememberMe, res);
        account = new Account(account).toPublicObject();
        res.json({status: 200, message: 'Successful account', data: account});

        next();

      } catch (e) {
        console.log(e);
        return res.status(500).json({status: 500, message: 'error registering account.'});
      }
    }
  };
  return self;
})();
