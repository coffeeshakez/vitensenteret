angular.module('app.reward')
.controller('RewardCtrl', function($scope, $stateParams) {
  $scope.onInitialize = function(){
    document.getElementById("robotPart").innerHTML = "robotarmer";
    document.getElementById("gameFinished").innerHTML = "minnespillet";
  }

});
