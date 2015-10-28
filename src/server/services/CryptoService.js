module.exports = cryptoSvc = (function () {
  var self = {
    //locals
    crypto: require('crypto'),

    //members
    getSecureHash: function (val) {
      return self.crypto.createHash('md5').update(val).digest('hex');
    }
  };

  return self;
})();