// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', [
  'ionic',
  'LocalStorageModule',
  'pascalprecht.translate',
  'app.controllers', 
  'app.routes', 
  'app.services', 
  'app.directives',
  'app.chooseLanguage',
  'app.welcomeScreen',
  'app.example',
  'app.waterflow',
  'app.parts',
  'app.overview',
  'app.periodic',
  'app.quiz',
  'app.memory',
  'app.reward',
  'app.shortest',
  'app.sound',
  'app.colors',
  'app.map',
  'app.beacon',
  

  //'app.myapp',
  ])

.config(function ($translateProvider) {
  $translateProvider.useStaticFilesLoader({
      prefix: 'translations/',
      suffix: '.json'
  });

  $translateProvider.registerAvailableLanguageKeys(['en', 'no'], {
      'en-US': 'en',
      'en-UK': 'en',
      'no-nb': 'no',
      'no-nn': 'no'
  });

  $translateProvider.fallbackLanguage('en');
  $translateProvider.useSanitizeValueStrategy(null);
})

.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('viten');
}])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})