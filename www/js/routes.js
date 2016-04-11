angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('index', {
    url: '/index',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('index.overview', {
    url: "/overview",
    views: {
      'overview': {
        templateUrl: "app/overview/views/overview.html",
        controller: 'OverviewCtrl'
      }
    },
    data: {pageTitle: 'Overview'}
  })

  .state('index.quiz', {
    url: "/quiz",
    views: {
      'quiz': {
        templateUrl: "app/quiz/views/default.html",
        controller: 'quizController'
      }
    },
    data: {pageTitle: 'Quiz'}
  })

  .state('index.reward', {
    url: "/reward",
    views: {
      'reward': {
        templateUrl: "app/reward/views/default.html",
        controller: 'RewardCtrl'
      }
    },
    data: {pageTitle: 'Reward'}
  })

  .state('index.memory', {
      url: "/memory",
      views: {
        'memory': {
          templateUrl: "app/memory/views/default.html",
          controller: 'MemoryCtrl'
        }
      },
      data: {pageTitle: 'Memory game'}
    })

    .state('index.periodic', {
        url: "/periodic",
        views: {
          'periodic': {
            templateUrl: "app/periodic/views/periodic.html",
            controller: 'periodicCtrl'
          }
        },
        data: {pageTitle: 'Periodic'}
      })

  .state('index.map', {
    url: '/map',
    views: {
      'map': {
        templateUrl: 'templates/vitensenteretKart.html',
        controller: 'vitensenteretKartCtrl'
      }
    }
  })

    .state('index.waterflow', {
    url: "/waterflow",
    views: {
      'waterflow': {
        templateUrl: "app/waterflow/views/default.html",
        controller: 'waterflowControl'
      }
    },
    data: {pageTitle: 'waterflow'}
  })

  .state('index.main', {
    url: "/main",

  .state('index.parts', {
    url: "/parts",
    views: {
      'parts': {
        templateUrl: "app/parts/views/parts.html",
        controller: 'PartsCtrl'
      }
    },
    data: {pageTitle: 'My parts'}
  })

  .state('index.chooseLanguage', {
    url: "/chooseLanguage",
    views: {
      'chooseLanguage': {
        templateUrl: "app/chooseLanguage/views/default.html",
        controller: 'ChooseLanguageCtrl'
      }
    },
    data: {pageTitle: 'ChooseLanguage'}
  })

  .state('index.welcomeScreen', {
    url: "/welcomeScreen",
    views: {
      'welcomeScreen': {
        templateUrl: "app/welcomeScreen/views/default.html",
        controller: 'WelcomeCtrl'
      }
    },
    data: {pageTitle: 'Welcome'}
  })

  .state('index.example', {
      url: "/example",
      views: {
        'example': {
          templateUrl: "app/example/views/default.html",
          controller: 'ExampleCtrl'
        }
      },
      data: {pageTitle: 'Example'}
    })

$urlRouterProvider.otherwise('/index/overview')


});