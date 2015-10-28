ia.App = Class.extend({
  init: function App(angular, namespace, authenticated) {
    this.ng = angular;
    this.namespace = namespace;
    this.authenticated = authenticated === true;
  },

  withStateParams: function (params) {
    return this.ng.extend(this.$state.params, params);
  },

  gotoAnchor: function (x) {
    var newHash = 'anchor' + x;
    if (this.$location.hash() !== newHash) {
      // set the $location.hash to `newHash` and
      // $anchorScroll will automatically scroll to it
      this.$location.hash('anchor' + x);
    } else {
      // call $anchorScroll() explicitly,
      // since $location.hash hasn't changed
      this.$anchorScroll();
    }
  },

  onStateChangeStart: function (event, toState) {
    toState = this.ng.extend({data: {authorize: false}}, toState);
    if (toState.data.authorize && !this.accountSvc.authenticated) {
      event.preventDefault();
      this.accountSvc.toState = toState;
      this.$state.go('login');
    }
  },

  onStateChangeSuccess: function () {
    this.$anchorScroll();
  },

  plumb: function (type, module, items) {
    var self = this;
    this.ng.forEach(items, function (item) {
      if (item.config && item.config.name) {
        module[type].call(module, item.config.name, item);
      }
    });
  },

  configureRoutes: function (controllers) {
    var self = this;
    this.ng.forEach(controllers, function (controller) {
      self.ng.forEach(controller.config.routes, function (route, name) {
        if (route.default)
          return self.$urlRouterProvider.otherwise(route.url);
        route.controller = controller.config.name;
        if (controller.config.as)
          route.controllerAs = controller.config.as;
        route = self.ng.extend({
          data: {
            authorize: !!route.authorize
          },
          templateUrl: controller.config.templateRoot + route.templatePath
        }, route);
        delete route.templatePath;
        delete route.authorize;
        self.$stateProvider.state(name, route);
      });
    });
  },

  onConfigure: function ($urlRouterProvider, $stateProvider, $locationProvider, $provide, uiSelectConfig) {
    this.$urlRouterProvider = $urlRouterProvider;
    this.$stateProvider = $stateProvider;
    uiSelectConfig.theme = 'bootstrap';
    uiSelectConfig.resetSearchInput = true;
    uiSelectConfig.appendToBody = true;
    this.configureRoutes(this.namespace.controllers);
    $locationProvider.html5Mode(true);
    $provide.constant('ng', this.ng);
  },

  onRun: function ($rootScope, $state, $stateParams, $location, $anchorScroll, accountSvc) {
    accountSvc.setAuthentication(this.authenticated);
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.withStateParams = this.ng.bind(this, this.withStateParams);
    $rootScope.gotoAnchor = this.ng.bind(this, this.gotoAnchor);
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$location = $location;
    this.$anchorScroll = $anchorScroll;
    this.accountSvc = accountSvc;
    this.$rootScope.$on("$stateChangeStart", this.onStateChangeStart);
    this.$rootScope.$on("$stateChangeSuccess", this.onStateChangeSuccess);
  },

  run: function () {
    if (this.running) return;
    var module = this.ng.module('ia', ['ngMessages', 'ngSanitize', 'ui.select', 'ui.utils', 'ui.router', 'ui.bootstrap']);
    this.plumb('controller', module, this.namespace.controllers);
    this.plumb('service', module, this.namespace.services);
    //this.plumb('directive', module, this.namespace.directives);
    //this.plumb('filter', module, this.namespace.filters);
    module.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', '$provide', 'uiSelectConfig', this.onConfigure]);
    module.run(['$rootScope', '$state', '$stateParams', '$location', '$anchorScroll', 'accountSvc', this.onRun]);
    this.running = true;
  }
});