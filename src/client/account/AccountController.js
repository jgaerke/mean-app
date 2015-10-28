ia.controllers.AccountController = Module.extend({
  $inject: ['$anchorScroll', '$state', 'accountSvc'],

  config: {
    name: 'accountCtrl',
    as: 'account',
    templateRoot: '/account/views',
    routes: {
      'login': {
        url: '/login',
        templatePath: '/login.html'
      },
      'register': {
        url: '/register',
        templatePath: '/register.html'
      }
    }
  },

  init: function ($anchorScroll, $state, accountSvc) {
    accountSvc.on('authchange', this.onAuthChange);
    this.$state = $state;
    this.accountSvc = accountSvc;
    this.authenticated = accountSvc.authenticated;
    this.details = {};
    this.status = 200;
    this.submitted = false;
    this.$anchorScroll = $anchorScroll;
  },

  onAuthChange: function(authenticated) {
    this.authenticated = authenticated;
  },

  passwordsMatch: function(passwordConfirm) {
    return this.details.password != passwordConfirm
  },

  onCreateSuccess: function () {
    this.$state.go('candidates.inprogress');
  },

  onCreateError: function (data, status) {
    this.status = status;
    this.details.password = '';
    this.details.passwordConfirm = '';
    this.$anchorScroll();
  },

  create: function () {
    this.submitted = true;
    if (this.form.$invalid) return;
    this.accountSvc.create(this.details).success(this.onCreateSuccess).error(this.onCreateError);
  },

  onLoginSuccess: function (data, status) {
    this.status = 200;
    this.$state.go('candidates.inprogress');
  },

  onLoginError: function (data, status) {
    this.status = status;
    this.details.password = '';
    this.$anchorScroll();
  },

  login: function () {
    this.submitted = true;
    if (this.form.$invalid) return;
    this.accountSvc.login(this.details).success(this.onLoginSuccess).error(this.onLoginError);
  },

  onLogoutSuccess: function (data, status) {
    this.$state.go('home');
    this.authenticated = this.accountSvc.authenticated;
  },

  onLogoutError: function (data, status) {
    this.status = status;
  },

  logout: function () {
    this.accountSvc.logout().success(this.onLogoutSuccess).error(this.onLogoutError);
  }
});