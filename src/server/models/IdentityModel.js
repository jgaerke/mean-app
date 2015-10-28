var Model = require('./Model');

module.exports = (function () {
  return Model.extend({
    init: function (data) {
      this._id = data._id || new ObjectID().toString();
      this._super(data);
    },

    toObject: function() {
      var output = this._super();
      output._id = output._id.toString();
      return output;
    }
  });
})();

