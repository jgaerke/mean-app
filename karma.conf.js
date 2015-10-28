var manifest = require('./src/Manifest');

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],

    files: manifest.clientTest.files,

    exclude: [manifest.client.dir + '/static/**/*.js'],

    browsers: ['PhantomJS'],

    reporters: ['progress', 'junit'],

    junitReporter: {
        outputFile: 'test-results.xml',
        suite: 'unit'
    }
  });
};
