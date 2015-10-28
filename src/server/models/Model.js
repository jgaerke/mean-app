var Class = require('../../client/Class');

module.exports = (function () {
  return Class.extend({

    //dependencies
    _: require('lodash'),

    init: function (data) {
      this._.assign(this, data);
    },

    toObject: function() {
      this._.omit(this, this.keys);
    },

    toPublicObject: function () {
      return this._.omit(this, this.privateKeys);
    }
  });
})();

