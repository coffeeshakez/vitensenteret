angular.module('app.sound')
.controller('soundCtrl', function($scope, $stateParams, $ionicPopup) {
    
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
        initNext();
    };
    
    $scope.soundCheckCorrect = function () {
        if(taskNumber==1){
            checkTriangle();
        }

        else if(taskNumber==2){
            checkSquare();
        }
        else if (taskNumber == 3){
            checkPentagon();
        }
    }

    function initNext(){
        taskNumber++;
         if(taskNumber==1){
            insertTriangle();
        }

        else if(taskNumber==2){
            insertSquare();
        }
        else if (taskNumber == 3){
            insertPentagon();
        }
        
        
    }

    function showPopup(bool){
        $scope.data = {};

        if (bool == true){

            var pop = {
                title : "RIKTIG!",
                subtitle: "Du svarte riktig!",
                scope: $scope,
                buttons: [
                { 
                    text: '<b>Neste oppgave</b>',
                    type: 'button-positive',

                    onTap: function(){
                        initNext();
                    }

                }
                ]
            }
        }

        else{
            var pop = {
                title: "FEIL",
                subtitle: "Dette var ikke helt riktig",
                scope: $scope,
                buttons:[
                {
                    text: '<b>Prøv igjen</b>',
                    type: 'button-positive',

                    onTap: function(){
                        

                    }

                    }
                ] 
            }

        }

        var myPopup = $ionicPopup.show(pop);
        
        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
    }
    

    function insertTriangle(){
       viewInsert.innerHTML = triangle;
   }
   
   function insertSquare(){
        viewInsert.innerHTML = square;
    }

    function insertPentagon(){
        viewInsert.innerHTML = pentagon;
    }

    function checkTriangle(){
        if(document.getElementById("triangleOne").value == 1){
            if(document.getElementById("triangleTwo").value == 2) {
                if(document.getElementById("triangleThree").value == 3){
                    showPopup(true);
                    return;
                }
            }
        }
        showPopup(false);
        
    }

    function checkSquare(){
        if (document.getElementById("squareOne").value == 1){
            if(document.getElementById("squareTwo").value == 2){
                if(document.getElementById("squareThree").value == 3){
                    if(document.getElementById("squareFour").value == 4){
                        showPopup(true);
                        return;
                    }
                }
            }
        }
        showPopup(false);
    }

    function checkPentagon(){
        if(document.getElementById("pentagonOne").value == 1){
            if(document.getElementById("pentagonTwo").value == 2){
                if(document.getElementById("pentagonThree").value == 3){
                    if(document.getElementById("pentagonFour").value == 4){
                        if (document.getElementById("pentagonFive").value = 5) {
                            console.log("yay");
                            showPopup(true);
                            return;
                        }
                    }
                }
            }
        }
        showPopup(false);
    }   
});