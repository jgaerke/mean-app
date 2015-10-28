var path = require('path'),
    mongodb = require('mongodb'),
    _ = require('lodash'),
    express = require('express'),
    https = require('https'),
    http = require('http'),
    fibrous = require('fibrous'),
    glob = require("glob"),
    manifest = require('../../Manifest'),
    loader = require('./utils/Loader'),
    properties = require('./config/Properties'),
    middleware = require('./config/Middleware'),
    Class = require('../common/Class'),

    loadGlobals = function () {
      global.db = mongodb.MongoClient.sync.connect(properties.mongo.url);
      global.ObjectID = mongodb.ObjectID;
      global.Class = Class;
    },

    loadModules = function (app) {
      manifest.server.files.forEach(function (filePaths) {
        glob.sync(filePaths).forEach(function (filePath) {
          console.log(filePath.replace('src/main/server/', './'));
          loader.loadFile(filePath.replace('src/main/server/', '../'), {app: app});
        });
      });
    };

fibrous.run(function () {
  var app = express();
  middleware.configure(app);
  loadGlobals();
  loadModules(app);
  app.listen(properties.express.port);
  console.log('listening on port 3000');
});
