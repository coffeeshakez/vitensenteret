angular.module('app.overview')
.controller('OverviewCtrl', function($scope, $rootScope, $state, $stateParams, localStorageService, $ionicPopup) {

    $scope.$on('$ionicView.enter', function() {
        //Runs every time view is changed to
        $rootScope.backButton = false;

    });

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
        title: $rootScope.trans[minigame.name],
        subTitle: $rootScope.trans[minigame.story],
        scope: $scope,
        buttons: [
          {
            text: '<b>Avbryt</b>',
            type: 'button-assertive',
            onTap: function (e) {
                return false;
            }
          },
          {
            text: '<b>Start!</b>',
            type: 'button-positive',
            onTap: function (e) {
                $rootScope.backButton = true;
                $state.go("index."+minigame.game);
            }
          },
        ]
      };
    }
});
