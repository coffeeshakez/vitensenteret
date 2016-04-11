angular.module('app.reward')
.controller('RewardCtrl', function($scope, $ionicHistory) {
  var robotarmer = " robotarmer "
  $scope.onInitialize = function(){
    document.getElementById("robotPart").innerHTML = robotarmer + "&nbsp;";
    document.getElementById("gameFinished").innerHTML = $ionicHistory.backTitle() +"&nbsp;";
    console.log($ionicHistory.backTitle());
  }

});
