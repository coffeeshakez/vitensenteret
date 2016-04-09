angular.module('app.sound')
.controller('soundCtrl', function($scope, $stateParams) {
    
    // var src = "../../sound/Ready-Sangen.mp3";
    // var media = new Audio(src);
    var sangen = document.getElementById("song");
    var viewInsert = document.getElementById("soundView");
    var taskNumber = 0;

    $scope.playImitate = function(){

		sangen.currentTime = 0;
        sangen.play();
   };

    $scope.initSound = function () {
        insertTriangle();
    };
    
    $scope.soundCheckCorrect = function () {
        insertSquare();
    }

    function insertTriangle(){
       viewInsert.innerHTML = triangle;
      //document.getElementById("soundTestCorrect").onClick = insertSquare();
   }

    function insertSquare(){
        viewInsert.innerHTML = square;
    }
});
