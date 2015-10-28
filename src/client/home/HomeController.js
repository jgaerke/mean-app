function HomeController() {
}

HomeController.$inject = [];

HomeController.config = {
  name: 'homeCtrl',
  as: 'home',
  templateRoot: '/home/views',
  routes: {
    'home': {
      url: '/',
      templatePath: '/home.html'
    },
    'default': {
      default: true,
      url: '/'
    }
  }
};

ia.controllers.HomeController = HomeController;