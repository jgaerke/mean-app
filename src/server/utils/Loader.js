var fs = require('fs');

module.exports = {
  loadFile: function (file, options) {
    var module = require(file);
    if(module && module.bind)
      module.bind(options);
  },
  loadDir: function (dir, options) {
    var files, module;
    files = fs.sync.readdir(dir);
    files.forEach(function (file) {
      module = require(dir + '/' + file);
      if(module.bind)
        module.bind(options);
    });
  }
};