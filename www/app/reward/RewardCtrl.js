angular.module('app.reward')
.controller('RewardCtrl', function($scope, $rootScope, $state, $stateParams) {

  $scope.$on('$ionicView.enter', setUp);
  $scope.$on('$ionicView.leave', cleanUp);
  $scope.robotPart;
  $scope.gameFinished;
  $scope.robotPartImage;

  function cleanUp(){
    $scope.robotPart = "";
    $scope.gameFinished = "";
    $scope.robotPartImage = "";
  }

  function setUp(){
    var part = $stateParams.part;
    $scope.gameFinished = $rootScope.trans[$stateParams.game];
    $scope.robotPart = $rootScope.parts[part].desc;
    $scope.robotPartImage = "sprite " + part + " " +  part + getRandomInt(0, $rootScope.parts[part].variants.length);

  }

  $scope.goToMain = function(){
    $state.go("index.parts");
  }

  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

});
