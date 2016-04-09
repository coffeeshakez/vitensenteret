angular.module('app.reward')
.controller('RewardCtrl', function($scope, $ionicHistory, $state) {

  $scope.$on('$ionicView.enter', getCorrectPart);
  $scope.$on('$ionicView.leave', cleanUp);

  var cameFrom = $ionicHistory.backTitle();

  function getCorrectPart(){
    console.log("fachs");
    console.log($ionicHistory.viewHistory());
    switch ($ionicHistory.backTitle()) {
      case "Minnespillet":
          document.getElementById("gameFinished").innerHTML = "minnespillet &nbsp";
          document.getElementById("robotPart").innerHTML = "venstre robotarm &nbsp";
        break;
      case "quiz":
        document.getElementById("gameFinished").innerHTML = "quizen &nbsp";
        document.getElementById("robotPart").innerHTML = "høyre robotarm &nbsp";
        break;
      case "Periodic":
        document.getElementById("gameFinished").innerHTML = "periodesystemspillet &nbsp";
        document.getElementById("robotPart").innerHTML = "venstre robotfot &nbsp";
        break;
      case "waterflow":
        document.getElementById("gameFinished").innerHTML = "vannkraftspillet &nbsp";
        document.getElementById("robotPart").innerHTML = "høyre robotfot &nbsp";
        break;
      case "sound":
        document.getElementById("gameFinished").innerHTML = "lydspillet &nbsp";
        document.getElementById("robotPart").innerHTML = "robotkroppen &nbsp";
        break;
      case "colorgame":
        document.getElementById("gameFinished").innerHTML = "fargespillet &nbsp";
        document.getElementById("robotPart").innerHTML = "robothodet &nbsp";
        break;
    }
  }
  function cleanUp(){
    console.log("fuchs")

  }

  $scope.backToRobot = function(){
    $state.go("index.main", {}, {reload:true});
  }

});
