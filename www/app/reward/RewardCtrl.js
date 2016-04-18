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
    $scope.gameFinished = $stateParams.game;
    $scope.robotPart = $rootScope.parts[part].desc;
    $scope.robotPartImage = "sprite " + part + " " +  part + $rootScope.parts[part].variant;

  }

  $scope.goToMain = function(){
    $state.go("index.parts");
  }



});
