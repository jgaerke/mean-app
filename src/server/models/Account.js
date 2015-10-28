var IdentityModel = require('./IdentityModel');

module.exports = (function () {
  return IdentityModel.extend({
    keys: ['email', 'aid', 'first', 'last', 'password', 'passwordConfirm', 'passwordHash'],
    privateKeys: ['password', 'passwordConfirm', 'passwordHash']
  });
})();

