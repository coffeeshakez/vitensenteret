angular.module('app.sound')
.controller('soundCtrl', function($scope, $stateParams) {
    
    // var src = "../../sound/Ready-Sangen.mp3";
    // var media = new Audio(src);
    var sangen = document.getElementById("song");
    var viewInsert = document.getElementById("soundView");
    var taskNumber = 1;

    $scope.playImitate = function(){

		sangen.currentTime = 0;
        sangen.play();
   };

    $scope.initSound = function () {
        insertTriangle();
    };
    
    $scope.soundCheckCorrect = function () {
        if(taskNumber==1){
            checkTriangle();
        }
    }

    function insertTriangle(){
       viewInsert.innerHTML = triangle;
      //document.getElementById("soundTestCorrect").onClick = insertSquare();
   }

    function checkTriangle(){
        if(document.getElementById("triangleOne").value == 1){
            if(document.getElementById("triangleTwo").value == 2) {
                if(document.getElementById("triangleThree").value == 4){
                    insertSquare();
                }
            }
        }
    }

    function insertSquare(){
        viewInsert.innerHTML = square;
    }
});
