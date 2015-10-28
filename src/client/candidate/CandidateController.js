function CandidateController($rootScope, $state, api) {
  this.$rootScope = $rootScope;
  this.$state = $state;
  this.api = api;
  this.candidate = {};
  this.submitted = false;
}

CandidateController.$inject = ['$rootScope', '$state', 'api'];

CandidateController.config = {
  name: 'candidateCtrl',
  as: 'candidate',
  templateRoot: '/candidate/views',
  routes: {
    'candidate': {
      abstract: true,
      templatePath: '/layout.html'
    },
    'candidate.upsert': {
      url: '/candidate/:id',
      templatePath: '/upsert.html',
      authorize: true
    },
    'candidate.summary': {
      url: '/candidate/:cid/summary',
      templatePath: '/summary.html',
      authorize: true
    }
  }
};

CandidateController.prototype.save = function () {
  this.submitted = true;
  if (this.form.$invalid) return;
  if (!this.$rootScope.$stateParams.id)
    return this.api.res('users').create(this.candidate);
  //this.api.res('candidate').update({ _id: this.$rootScope.$stateParams.cid }, this.candidate);
};

ia.controllers.CandidateController = CandidateController;