angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  //The main state, which shows the tabs. all other views inherit from this
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

  .state('index.map', {
    url: "/map",
    views: {
      'map': {
        templateUrl: "app/map/views/map.html",
        controller: 'MapCtrl'
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
    url: "/reward?game?part?sprite",
    views: {
      'reward': {
        templateUrl: "app/reward/views/default.html",
        controller: 'RewardCtrl'
      }
    },
    data: {pageTitle: 'Reward'}
  })

  .state('index.colors', {
    url: "/colors",
    views: {
      'colors': {
        templateUrl: "app/colors/views/default.html",
        controller: 'ColorsCtrl'
      }
    },
    data: {pageTitle: 'Colors'}
  })

  .state('index.shortest', {
      url: "/shortest",
      views: {
        'shortest': {
          templateUrl: "app/shortest/views/shortest.html",
          controller: 'ShortestCtrl'
        }
      },
      data: {pageTitle: 'Shortest'}
    })

    .state('index.sound', {
        url: "/sound",
        views: {
          'sound': {
            templateUrl: "app/sound/views/sound.html",
            controller: 'soundCtrl'
          }
        },
        data: {pageTitle: 'Sound'}
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

   .state('index.finish', {
      url: "/finish",
      views: {
        'finish': {
          templateUrl: "app/finish/views/finish.html",
          controller: 'finishCtrl'
        }
      },
      data: {pageTitle: 'Vitensenteret'}
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

//default url. must be /index/overiview
$urlRouterProvider.otherwise('/index/overview')
  
});