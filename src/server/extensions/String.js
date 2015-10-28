module.exports =(function() {
  var self;

  self  = {
    capitalize: function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    bind: function() {
      String.prototype.capitalize = self.capitalize;
    }
  };

  return self;
})();