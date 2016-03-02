angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  .state('index.vitensenteretKart', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/vitensenteretKart.html',
        controller: 'vitensenteretKartCtrl'
      }
    }
  })

  .state('index.cartTabDefaultPage', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/cartTabDefaultPage.html',
        controller: 'cartTabDefaultPageCtrl'
      }
    }
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


  .state('index.main', {
    url: "/main",
    views: {
      'main': {
        templateUrl: "app/main/views/main.html",
        controller: 'MainCtrl'
      }
    },
    data: {pageTitle: 'Main view'}
  })

  .state('index', {
    url: '/index',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/index/main')


});