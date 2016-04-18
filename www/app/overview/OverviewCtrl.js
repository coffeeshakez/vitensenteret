angular.module('app.overview')
.controller('OverviewCtrl', function($scope, $rootScope, $state, $stateParams, localStorageService) {

    var minigamesLocal = localStorageService.get('minigames');
    var partsLocal = localStorageService.get('parts');
    var languageLocal = localStorageService.get('language');

    if(!languageLocal){
        $state.go("index.chooseLanguage");
    }else{
        $rootScope.language = languageLocal;
        console.log("Stored language is: "+$rootScope.language);
    }

    $scope.$watch('minigames', function () {
      localStorageService.set('minigames', $scope.minigames);
    }, true);

    $scope.$watch('parts', function () {
      localStorageService.set('parts', $scope.parts);
    }, true);

    $rootScope.minigames = minigamesLocal || {
        "quiz":      {name: "Quiz",           game: "quiz",      icon: "ion-help",              part: "head",   collected: false},
        "periodic":  {name: "Grunnstoffer",   game: "periodic",  icon: "ion-nuclear",           part: "body",   collected: false},
        "colors":    {name: "Fargelås",       game: "colors",    icon: "ion-lock-combination",  part: "head",   collected: false},
        "sound":     {name: "Melodispillet",  game: "sound",     icon: "ion-music-note",        part: "head",   collected: false},
        "waterflow": {name: "Vannkobling",    game: "waterflow", icon: "ion-waterdrop",         part: "arms",   collected: false},
        "memory":    {name: "Minnespillet",   game: "memory",    icon: "ion-load-b",            part: "arms",   collected: false},
        "shortest":  {name: "Korteste veien", game: "shortest",  icon: "ion-map",               part: "legs",   collected: false},

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
        document.location = ".";
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

    $scope.minigameClick = function(minigame){
        $state.go("index."+minigame.game);
    }

    $scope.minigameToggle = function(minigame){
        minigame.collected ^= true;
    }
});
