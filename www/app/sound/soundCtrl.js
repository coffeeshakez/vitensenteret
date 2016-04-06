angular.module('app.sound')
.controller('soundCtrl', function($scope, $stateParams) {
    
    // var src = "../../sound/Ready-Sangen.mp3";
    // var media = new Audio(src);
    var sangen = document.getElementById("song");

    $scope.playImitate = function(){
       
       sangen.play();
   }

    $scope.pauseImitate = function(){
       
       sangen.pause();
   }
});
