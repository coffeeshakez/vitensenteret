angular.module('app.overview')
.controller('OverviewCtrl', function($scope, $state, $stateParams) {

    $scope.minigames = [
        {name: "Quiz", game: "quiz", icon: "ion-help", collected: false},
        {name: "Grunnstoffer", game: "periodic", icon: "ion-nuclear", collected: false},
        {name: "Fargelås", game: "colors", icon: "ion-lock-combination", collected: false},
        {name: "Melodi", game: "melody", icon: "ion-music-note", collected: false},
        {name: "Flyt", game: "waterflow", icon: "ion-network", collected: false},
        {name: "Minnespill", game: "memory", icon: "ion-load-b", collected: false},
        {name: "Korteste vei", game: "shortest", icon: "ion-map", collected: false},

    ];

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
