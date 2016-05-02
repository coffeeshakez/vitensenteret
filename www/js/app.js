// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', [
  'ionic',
  'LocalStorageModule',
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

.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('viten');
}])

.run(function($ionicPlatform, $rootScope, $state, $stateParams, localStorageService) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    //START OWN CODE

    var minigamesLocal = localStorageService.get('minigames');
    var partsLocal = localStorageService.get('parts');
    var languageLocal = localStorageService.get('language');

    if(!languageLocal){
        $state.go("index.chooseLanguage");
    }else{
        $rootScope.language = languageLocal;
        console.log("Stored language is: "+$rootScope.language);
    }

    
    if ($rootScope.language === "no"){
        console.log("Norwegian selected");
        $rootScope.trans = norwegian;
    }
    else if ($rootScope.language === "en"){
        console.log("English selected");
        $rootScope.trans = english;
    }
    else{
        $rootScope.trans = english;
        console.log("English fallback.");
    }

    $rootScope.$watch('minigames', function () {
      localStorageService.set('minigames', $rootScope.minigames);
    }, true);

    $rootScope.$watch('parts', function () {
      localStorageService.set('parts', $rootScope.parts);
    }, true);


    $rootScope.minigames = minigamesLocal || {
        "quiz":      {name: "OVERVIEW_QUIZ_BUTTON",           game: "quiz",      icon: "ion-help",              part: "head",   collected: false, story: "QUIZ_INTRO_POPUP"},
        "periodic":  {name: "OVERVIEW_ELEMENTS_BUTTON",   game: "periodic",  icon: "ion-nuclear",           part: "body",   collected: false, story: "ELEMENTS_INTRO_POPUP"},
        "colors":    {name: "OVERVIEW_COLOR_BUTTON",       game: "colors",    icon: "ion-lock-combination",  part: "head",   collected: false, story: "COLOR_INTRO_POPUP"},
        "sound":     {name: "OVERVIEW_MELODY_BUTTON",  game: "sound",     icon: "ion-music-note",        part: "head",   collected: false, story: "MELODY_INTRO_POPUP"},
        "waterflow": {name: "OVERVIEW_WATER_BUTTON",    game: "waterflow", icon: "ion-waterdrop",         part: "arms",   collected: false, story: "WATER_INTRO_POPUP"},
        "memory":    {name: "OVERVIEW_SIMON_SAYS_BUTTON",   game: "memory",    icon: "ion-load-b",            part: "arms",   collected: false, story: "SIMON_SAYS_INTRO_POPUP"},
        "shortest":  {name: "OVERVIEW_SHORTEST_PATH_BUTTON", game: "shortest",  icon: "ion-map",               part: "legs",   collected: false, story: "SHORTEST_PATH_INTRO_POPUP"},
        "beacon":    {name: "OVERVIEW_SHORTEST_PATH_BUTTON", game: "beacon",  icon: "ion-bluetooth",               part: "legs",   collected: false, story: "SHORTEST_PATH_INTRO_POPUP"},

    };

    $rootScope.parts = partsLocal || {
        "head": {name: "Hode",  desc: "et hode",  type: "head", variants: [1, 2, 3],      variant: 3, collected: false},
        "arms": {name: "Armer", desc: "to armer", type: "arms", variants: [1, 2, 3],      variant: 1, collected: false},
        "legs": {name: "Bein",  desc: "bein",     type: "legs", variants: [1, 2, 3, 4],   variant: 1, collected: false},
        "body": {name: "Overkropp", desc: "en overkropp", type: "body", variants: [1, 2], variant: 2, collected: false},
    };

    $rootScope.state = $state;
  });
})