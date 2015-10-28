function CandidatesController() {
}

CandidatesController.$inject = [];

CandidatesController.config = {
  name: 'candidatesCtrl',
  as: 'candidates',
  templateRoot: '/candidates/views',
  routes: {
    'candidates': {
      abstract: true,
      templatePath: '/layout.html'
    },
    'candidates.inprogress': {
      url: '/candidates/inprogress',
      templatePath: '/list.html',
      authorize: true
    },
    'candidates.accepted': {
      url: '/candidates/accepted',
      templatePath: '/list.html',
      authorize: true
    },
    'candidates.rejected': {
      url: '/candidates/rejected',
      templatePath: '/list.html',
      authorize: true
    }
  }
};

ia.controllers.CandidatesController = CandidatesController;