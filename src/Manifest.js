var _, clientDir, serverDir, client, clientWithoutTests, server, clientTests, serverTests;

_ = require('lodash');
clientDir = 'src/client';
serverDir = 'src/server';

client = [
  clientDir + '/libs/angular.js',
  clientDir + '/libs/angular-ui-router.js',
  clientDir + '/libs/ui-bootstrap.js',
  clientDir + '/libs/ui-bootstrap-tpls.js',
  clientDir + '/libs/**/*.js',
  clientDir + '/Namespace.js',
  clientDir + '/Class.js',
  clientDir + '/Module.js',
  clientDir + '/**/*.js',
  clientDir + '/App.js',
  '!' + clientDir + '/static/**/*.js'
];

server = [
  clientDir + '/Class.js',
  serverDir + '/utils/**/*.js',
  serverDir + '/services/**/*.js',
  serverDir + '/models/**/*.js',
  serverDir + '/policies/**/*.js',
  serverDir + '/commands/**/*.js',
  serverDir + '/controllers/**/*.js'
];

clientWithoutTests = _.union(client, ['!' + clientDir + '/**/*.spec.js']);
clientTests = _.union(client, [clientDir + '/**/*.spec.js']);
serverTests = _.union([serverDir + '/Main.spec.js'], server, [serverDir + '/**/*.spec.js']);

module.exports = {
  client: {
    dir: clientDir,
    files: client,
    filesWithoutTests: clientWithoutTests
  },
  server: {
    dir: serverDir,
    files: server
  },
  clientTest: {
    dir: clientDir,
    files: clientTests
  },
  serverTest: {
    dir: serverDir,
    files: serverTests
  }
};
;