angular.module('app.reward')
.controller('RewardCtrl', function($scope, $state, $stateParams) {

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
    $scope.gameFinished = $stateParams.game;
    $scope.robotPart = $stateParams.part;
    $scope.robotPartImage = $stateParams.sprite;

  }

  $scope.goToMain = function(){
    $state.go("index.parts");
  }



});
