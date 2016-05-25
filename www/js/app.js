//Main angular file which loads all other modules, initializes providers and config.

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
  'app.finish',
  

  //'app.myapp',
  ])

//config localstorage
.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('viten');
}])

//this function will run after Angular has initialized, before any other controllers.
.run(function($ionicPlatform, $rootScope, $state, $stateParams, localStorageService) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    //START OWN CODE

    //get variables from localstorage, if they exist
    var minigamesLocal = localStorageService.get('minigames');
    var partsLocal = localStorageService.get('parts');
    var languageLocal = localStorageService.get('language');
    var gameLocal = localStorageService.get('finished');


    //set language from localstorage or set english as temporary language
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


    //sync important variables with localStorage
    $rootScope.$watch('minigames', function () {
      localStorageService.set('minigames', $rootScope.minigames);
    }, true);

    $rootScope.$watch('parts', function () {
      localStorageService.set('parts', $rootScope.parts);
    }, true);

    $rootScope.$watch('game', function () {
      localStorageService.set('game', $rootScope.game);
    }, true);

    //resetGame will delete all locally stored data and refresh the application page, effectively starting the game from scratch
    $rootScope.resetGame = function(){
        localStorageService.clearAll();
        console.log("Cleared local-storage");
        document.location = "index.html";
    }


    //Minigame state data. If there is no local data stored, it will use the initial data defined here. "name" is the shown name, "part" is the robot part which is won when completed, "collected" is if it has been completed, "found" is if it has been located by beacon.
    $rootScope.minigames = minigamesLocal || {
        "quiz":      {name: "OVERVIEW_QUIZ_BUTTON",           game: "quiz",      icon: "ion-chatbubble-working",part: "head",   collected: false, story: "QUIZ_INTRO_POPUP",            found: true },
        "periodic":  {name: "OVERVIEW_ELEMENTS_BUTTON",       game: "periodic",  icon: "ion-nuclear",           part: "body",   collected: false, story: "ELEMENTS_INTRO_POPUP",        found: false },
        "colors":    {name: "OVERVIEW_COLOR_BUTTON",          game: "colors",    icon: "ion-lock-combination",  part: "body",   collected: false, story: "COLOR_INTRO_POPUP",           found: false },
        "sound":     {name: "OVERVIEW_MELODY_BUTTON",         game: "sound",     icon: "ion-music-note",        part: "head",   collected: false, story: "MELODY_INTRO_POPUP",          found: false },
        "waterflow": {name: "OVERVIEW_WATER_BUTTON",          game: "waterflow", icon: "ion-waterdrop",         part: "arms",   collected: false, story: "WATER_INTRO_POPUP",           found: false },
        "memory":    {name: "OVERVIEW_SIMON_SAYS_BUTTON",     game: "memory",    icon: "ion-load-b",            part: "arms",   collected: false, story: "SIMON_SAYS_INTRO_POPUP",      found: false },
        "shortest":  {name: "OVERVIEW_SHORTEST_PATH_BUTTON",  game: "shortest",  icon: "ion-map",               part: "legs",   collected: false, story: "SHORTEST_PATH_INTRO_POPUP",   found: false },
    };

    //Player's robot part data. "type" and "variant" is connected to the css styles. "variant" is the currently selected robot variant.
    $rootScope.parts = partsLocal || {
        "head": {name: "Hode",      desc: "et hode",      type: "head", variants: [1, 2, 3, 4], variant: 3, collected: false, hue: 0, brightness: 1, editing: true},
        "arms": {name: "Armer",     desc: "to armer",     type: "arms", variants: [1, 2, 3, 4], variant: 1, collected: false, hue: 0, brightness: 1, editing: false},
        "body": {name: "Overkropp", desc: "en overkropp", type: "body", variants: [1, 2, 3, 4], variant: 2, collected: false, hue: 0, brightness: 1, editing: false},
        "legs": {name: "Bein",      desc: "bein",         type: "legs", variants: [1, 2, 3, 4], variant: 1, collected: false, hue: 0, brightness: 1, editing: false},
    };

    //Game state data
    $rootScope.game = gameLocal || {
      hasFinished: false,
      robot: {}
    };

    //$state is the current page state, stored on rootScope so it can be used in views
    $rootScope.state = $state;
  });
})