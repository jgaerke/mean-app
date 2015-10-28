function QuestionnaireController() {
}

QuestionnaireController.$inject = [];

QuestionnaireController.config = {
  name: 'questionnaireCtrl',
  as: 'questionnaire',
  templateRoot: '/questionnaire/views',
  routes: {
    'candidate.questionnaire': {
      url: '/candidate/:cid/questionnaire/:questionnaireId',
      templatePath: '/questionnaire/questionnaire.html',
      controller: 'questionnaireCtrl',
      authorize: true
    },
    'candidate.questionnaire.setup': {
      parent: 'candidate',
      url: '/candidate/:cid/questionnaire/:questionnaireId/setup',
      templatePath: '/questionnaire/setup.html',
      controller: 'questionnaireCtrl',
      authorize: true
    },
    'candidate.questionnaire.setup.question': {
      parent: 'candidate',
      url: '/candidate/:cid/questionnaire/:questionnaireId/setup/:questionId/question',
      templatePath: '/questionnaire/question/setup.html',
      controller: 'questionnaireCtrl',
      authorize: true
    }
  }
};

ia.controllers.QuestionnaireController = QuestionnaireController;