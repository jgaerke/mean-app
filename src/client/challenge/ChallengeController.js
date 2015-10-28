function ChallengeController() {
}

ChallengeController.$inject = [];

ChallengeController.config = {
  name: 'candidatesCtrl',
  as: 'candidates',
  templateRoot: '/challenge/views',
  routes: {
    'candidate.challenge': {
      parent: 'candidate',
      url: '/candidate/:cid/challenge/:eid',
      templatePath: '/challenge.html',
      authorize: true
    },
    'candidate.challenge.setup': {
      parent: 'candidate',
      url: '/candidate/:cid/challenge/setup/:eid',
      templatePath: '/setup.html',
      authorize: true
    }
  }
};

ia.controllers.ChallengeController = ChallengeController;