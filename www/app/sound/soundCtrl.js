angular.module('app.sound')
.controller('soundCtrl', function($scope, $rootScope, $stateParams, $ionicPopup, $state) {

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
           showPopup(checkTriangle()[0], checkTriangle()[1]);
        }

        else if(taskNumber==2){
            showPopup(checkSquare()[0], checkSquare()[1]);
        }
        else if (taskNumber == 3){
            showPopup(checkPentagon()[0], checkPentagon()[1]);
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

    function showPopup(bool, correctArray){




        $scope.data = {};

        if (bool == true){
            if(taskNumber==3) {
                var pop = {
                    title: "RIKTIG!",
                    subTitle: "Du svarte riktig!",
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>Ta i mot din premie!</b>',
                            type: 'button-positive',

                            onTap: function () {
                                $rootScope.winGame("sound");
                                return;
                            }

                        }
                    ]
                }
            }

            else {
                var pop = {
                    title: "RIKTIG!",
                    subTitle: "Du svarte riktig!",
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>Neste oppgave</b>',
                            type: 'button-positive',

                            onTap: function () {
                                initNext();
                            }

                        }
                    ]
                }
            }
        }

        else{
            var feedback1 = "Dette var ikke helt riktig, du hadde rør";
            var feedback2 = " på posisjon";
            var feedback3 = "";
            var feedback4 = " riktig";

            for(var i=correctArray.length - 1; i>=0; i--){
                if(feedback3.length == 2 && correctArray[i] == 1){
                    feedback3 = (i+1) +  " og " + feedback3;
                    feedback1+= "ene ";
                    feedback2+= "ene ";
                }
                else if(feedback3.length == 0 && correctArray[i] == 1){
                    feedback3 = " " + (i+1) + feedback3;
                }

                else if(correctArray[i] == 1) {
                    feedback3 = (i + 1) + ", " + feedback3;
                }

            }

            if(feedback3.length == 0){
                feedback1 = "Dette var ikke riktig. Du har dessverre ingen rør på riktig posisjon."
                feedback2 = "";
                feedback3 = "";
                feedback4 = "";
            }
            else if(feedback3.length == 2){
                feedback1 += "et "
            }
            var pop = {
                title: "FEIL",
                subTitle:  feedback1 +  feedback2 + feedback3 + feedback4,
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
        var rettArray = [0,0,0,0,0];
        var antallRett = 0;
        if(document.getElementById("triangleOne").value == 1) {
            rettArray[0] = 1;
            antallRett++;
        }

        if(document.getElementById("triangleTwo").value == 2) {
            rettArray[1] = 1;
            antallRett++;
        }
        if(document.getElementById("triangleThree").value == 3){
            rettArray[2] = 1
            antallRett++;
        }
        if (antallRett == 3){
            return [true, rettArray];
        }
        return [false,rettArray];

    }

    function checkSquare(){
        var rettArray = [0,0,0,0,0];
        var antallRett =0;
        if (document.getElementById("squareOne").value == 1) {
            rettArray[0] = 1;
            antallRett++;
        }
        if (document.getElementById("squareTwo").value == 2) {
            rettArray[1] = 1;
            antallRett++;
        }

        if (document.getElementById("squareThree").value == 3) {
            rettArray[2] = 1;
            antallRett++;
        }
        if (document.getElementById("squareFour").value == 4) {
            rettArray[3] = 1;
            antallRett++;
        }
        if(antallRett ==4){
            return [true, rettArray]
        }

        return [false, rettArray];
    }

    function checkPentagon(){
        var rettArray = [0,0,0,0,0];
        var antallRett =0;
        if(document.getElementById("pentaOne").value == 1){
            rettArray[0] = 1;
            antallRett++;
        }
        if(document.getElementById("pentaTwo").value == 2){
            rettArray[1] = 1;
            antallRett++;
        }
        if(document.getElementById("pentaThree").value == 3){
            rettArray[2] = 1;
            antallRett++;
        }
        if(document.getElementById("pentaFour").value == 4){
            rettArray[3] = 1;
            antallRett++;
        }
        if (document.getElementById("pentaFive").value = 5) {
            rettArray[4] = 1;
            antallRett++;
        }
            // HER MÅ DET HÅNDTERES OM SPILLET ER FERDIG!!
        if(antallRett == 5){
            return [true, rettArray]
        }

        return [false, rettArray];
    }
});