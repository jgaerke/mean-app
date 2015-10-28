ia.services.Api = Module.extend({
  $inject: ['$http', 'ng'],

  config: {
    name: 'api'
  },

  init: function ($http, ng) {
    this.$http = $http;
    this.ng = ng;
  },

  exec: function(resource, command, params) {
    return this.$http.post('/api/' + resource + '/'  + command.toLowerCase(), params);
  },

  resource: function (name) {
    return this.ng.extend({ng: this.ng, $http: this.$http, path: '/api/' + name }, {
      get: function (path, id) {
        return this.http.get(this.path + '/' + id);
      },
      find: function (criteria, options) {
        criteria = this.ng.toJson(criteria || {});
        options = this.ng.toJson(options || {});
        return this.http.get(this.path + '?criteria=' + criteria + '&options=' + options);
      },
      create: function (doc) {
        return this.http.post(this.path, doc);
      },
      update: function (criteria, update) {
        return this.http.post(this.path, {criteria: criteria, update: update});
      },
      delete: function (id) {
        return this.http.delete(this.path + '/' + id);
      }
    });
  }
});
