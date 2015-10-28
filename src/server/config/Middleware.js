var express = require('express'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    expressLayouts = require('express-ejs-layouts'),
    fibrous = require('fibrous'),
    manifest = require('../../../Manifest'),
    favicon = require('../utils/Favicon'),
    normalizePath = require('../utils/CanonicalPath'),
    properties = require('./Properties');

module.exports = {
  configure: function (app) {
    app.use(express.static(manifest.client.dir));
    app.use(favicon);
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
    app.use(multer()); // for parsing multipart/form-data
    app.use(fibrous.middleware);
    app.set('view engine', 'ejs');
    app.set('views', manifest.server.dir + '/views');
    app.use(expressLayouts);
    app.use(normalizePath);
  }
};
