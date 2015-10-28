ia.services.AccountService = Module.extend({

  $inject: ['api'],

  config: {
    name: 'accountSvc'
  },

  init: function (api) {
    this.api = api;
  },

  setAuthentication: function(authenticated) {
    this.trigger('authchange', this.authenticated = authenticated);
  },

  onLoginSuccess: function () {
    this.trigger('authchange', this.authenticated = true);
  },

  login: function (account) {
    return this.api.exec('account', 'login', account).success(this.onLoginSuccess);
  },

  onLogoutSuccess: function () {
    this.trigger('authchange', this.authenticated = false);
  },

  logout: function () {
    return this.api.exec('account', 'logout').success(this.onLogoutSuccess);
  },

  onCreateSuccess: function () {
    this.trigger('authchange', this.authenticated = true);
  },

  create: function (account) {
    delete account.passwordConfirm;
    return this.api.exec('account', 'register', account).success(this.onCreateSuccess);
  }
});

