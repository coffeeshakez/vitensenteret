angular.module('app.overview')
.controller('OverviewCtrl', function($scope, $rootScope, $state, $stateParams) {

    $rootScope.minigames = {
        "quiz":      {name: "Quiz", game: "quiz", icon: "ion-help", collected: true},
        "periodic":  {name: "Grunnstoffer", game: "periodic", icon: "ion-nuclear", collected: true},
        "colors":    {name: "Fargelås", game: "colors", icon: "ion-lock-combination", collected: true},
        "sound":     {name: "Melodi", game: "sound", icon: "ion-music-note", collected: false},
        "waterflow": {name: "Vannkobling", game: "waterflow", icon: "ion-waterdrop", collected: false},
        "memory":    {name: "Minnespillet", game: "memory", icon: "ion-load-b", collected: false},
        "shortest":  {name: "Korteste veien", game: "shortest", icon: "ion-map", collected: false},

    };

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
