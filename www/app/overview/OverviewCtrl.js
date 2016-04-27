angular.module('app.overview')
.controller('OverviewCtrl', function($scope, $rootScope, $state, $stateParams, localStorageService, $ionicPopup, $translate) {


    var minigamesLocal = localStorageService.get('minigames');
    var partsLocal = localStorageService.get('parts');
    var languageLocal = localStorageService.get('language');

    if(!languageLocal){
        $state.go("index.chooseLanguage");
    }else{
        $rootScope.language = languageLocal;
        console.log("Stored language is: "+$rootScope.language);
    }

    $translate.preferredLanguage($rootScope.language);
    $translate.use($rootScope.language);

    $translate(["OVERVIEW_QUIZ_BUTTON",
    "OVERVIEW_ELEMENTS_BUTTON",
    "OVERVIEW_COLOR_BUTTON",
    "OVERVIEW_MELODY_BUTTON",
    "OVERVIEW_WATER_BUTTON",
    "OVERVIEW_SIMON_SAYS_BUTTON",
    "OVERVIEW_SHORTEST_PATH_BUTTON",
    "OVERVIEW_POPUP_START_BUTTON",
    "OVERVIEW_POPUP_CANCEL_BUTTON"]).then(function(translations){
        $scope.translations = translations;
    });


    
    $scope.$watch('minigames', function () {
      localStorageService.set('minigames', $scope.minigames);
    }, true);

    $scope.$watch('parts', function () {
      localStorageService.set('parts', $scope.parts);
    }, true);

    $rootScope.minigames = minigamesLocal || {
        "quiz":      {name: "OVERVIEW_QUIZ_BUTTON",           game: "quiz",      icon: "ion-help",              part: "head",   collected: false, story: "En liten Europa-måneboer lurer på hvordan Jordas historie er. Kan du hjelpe den?"},
        "periodic":  {name: "OVERVIEW_ELEMENTS_BUTTON",   game: "periodic",  icon: "ion-nuclear",           part: "body",   collected: false, story: "En gal vitenskapsmann prøver å lage en tidsmaskin, men vet ikke hvordan han skal lage ingrediensene. Kan du hjelpe?"},
        "colors":    {name: "OVERVIEW_COLOR_BUTTON",       game: "colors",    icon: "ion-lock-combination",  part: "head",   collected: false, story: "Du finner en låst kiste med en rar kombinasjonslås som har forskjellige farger. Klarer du å låse den opp?"},
        "sound":     {name: "OVERVIEW_MELODY_BUTTON",  game: "sound",     icon: "ion-music-note",        part: "head",   collected: false, story: "En liten fugl har mistet moren sin. Kan du hjelpe den å svare på moren sin fuglesang?"},
        "waterflow": {name: "OVERVIEW_WATER_BUTTON",    game: "waterflow", icon: "ion-waterdrop",         part: "arms",   collected: false, story: "Det spruter vann i alle retninger ut av vannkraftverket. Kan du få rørene på plass så det genererer strøm igjen?"},
        "memory":    {name: "OVERVIEW_SIMON_SAYS_BUTTON",   game: "memory",    icon: "ion-load-b",            part: "arms",   collected: false, story: "Du møter på et glemskt orakel som har mistet hukommelsen. Kan du hjelpe det å huske kombinasjonen til orakel-skipet sitt?"},
        "shortest":  {name: "OVERVIEW_SHORTEST_PATH_BUTTON", game: "shortest",  icon: "ion-map",               part: "legs",   collected: false, story: "Du møter på en handelsmann som skal reise landet rundt. Kan du hjelpe han finne den korteste veien?"},

    };

    $rootScope.parts = partsLocal || {
        "head": {name: "Hode",  desc: "et hode",  type: "head", variants: [1, 2, 3],      variant: 3, collected: false},
        "arms":  {name: "Armer", desc: "to armer", type: "arms", variants: [1, 2, 3],      variant: 1, collected: false},
        "legs":  {name: "Bein",  desc: "bein",     type: "legs", variants: [1, 2, 3, 4],   variant: 1, collected: false},
        "body": {name: "Overkropp", desc: "en overkropp", type: "body", variants: [1, 2], variant: 2, collected: false},
    };

    $rootScope.winGame = function(game){
        var wonGame = $rootScope.minigames[game];
        $rootScope.parts[wonGame.part].collected = true;

        wonGame.collected = true;
        $state.go("index.reward", {"game": wonGame.name, "part": wonGame.part});
        return true;
    }

    $rootScope.resetGame = function(){
        localStorageService.clearAll();
        console.log("Cleared local-storage");
        document.location = "index.html";
    }

    $scope.collectedMinigamesCount = function(){
        var count = 0;
        angular.forEach($scope.minigames, function(minigame){
            count += minigame.collected ? 1 : 0;
        });
        return count; 
    }
    
    $scope.minigameClasses = function(minigame){
        var collected = minigame.collected ? 'part-collected' : 'part-not-collected';
        var icon = minigame.icon;
        return icon + " " + collected;
    }

    $scope.minigameStart = function(minigame){
        var popup = gamePopup(minigame);
        var myPopup = $ionicPopup.show(popup);
    }

    $scope.minigameToggle = function(minigame){
        minigame.collected ^= true;
    }

    function gamePopup(minigame) {
      return {
        title: minigame.name,
        subTitle: minigame.story,
        scope: $scope,
        buttons: [
          {
            text: '<b>Start!</b>',
            type: 'button-positive',
            onTap: function (e) {
                $state.go("index."+minigame.game);
            }
          },
          {
            text: '<b>Avbryt</b>',
            type: 'button-positive',
            onTap: function (e) {
                return false;
            }
          }
        ]
      };
    }
});
