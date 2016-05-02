angular.module('app.sound')
.controller('soundCtrl', function($scope, $rootScope, $stateParams,$ionicPlatform, $ionicPopup, $state) {

    // var src = "../../sound/Ready-Sangen.mp3";
    // var media = new Audio(src);
    var sangen = document.getElementById("song");
    var viewInsert = document.getElementById("soundView");
    var taskNumber = 0;
    

/*
triangle-1
squareTwo
pentaTwo
*/
    $scope.stages = {
        "triangle": {
            image: "./img/triangle.svg",
            id: "triangle",
            size: [0,1,2],
            sound: "./sound/teleport.wav",
            selected:[[1,2,3], [1,2,3], [1,2,3]]
        },
        "square": {
            image: "./img/square.svg",
            id: "square",
            size: [0,1,2,3],
            sound: "./sound/teleport.wav",
            selected:[[1,2,3,4],[1,2,3,4,], [1,2,3,4], [1,2,3,4]]
        },
        "penta": {
            image: "./img/pentagon.svg",
            id: "penta",
            size: [0,1,2,3,4],
            sound: "./sound/teleport.wav",
            selected:[[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]]
        },
    };

    // $scope.filterCondition={
    //     operator: 'eq'
    // }
    //
    // $scope.operators = [
    //     {value:1 , selected:'neq'},
    //     {value:2 , selected:'neq'},
    //     {value:3 , selected:'neq'},
    //     {value:4 , selected:'neq'},
    //     {value:5 , selected:'neq'}
    // ];




    $scope.playImitate = function(){

		sangen.currentTime = 0;
        sangen.play();
   };



    $scope.initSound = function () {
        initNext();
    }


        $scope.soundCheckCorrect = function () {
            if (taskNumber == 1) {
                showPopup(checkTriangle()[0], checkTriangle()[1]);
            }

            else if (taskNumber == 2) {
                showPopup(checkSquare()[0], checkSquare()[1]);
            }
            else if (taskNumber == 3) {
                showPopup(checkPentagon()[0], checkPentagon()[1]);
            }
        }

        function initNext() {
            if (taskNumber == 0) {
                $scope.currentStage = $scope.stages["triangle"];
                console.log($scope.currentStage.selected);
                $scope.currentStage.selected = [1,2,3];
            }
            else if (taskNumber == 1) {
                $scope.currentStage = $scope.stages["square"];
                console.log($scope.currentStage.selected);
                $scope.currentStage.selected = [1,2,3,4];
            }
            else if (taskNumber == 2) {
                $scope.currentStage = $scope.stages["penta"];
                console.log($scope.currentStage.selected);
                $scope.currentStage.selected = [1,2,3,4,5];
            }



            taskNumber++;

        }

        function showPopup(bool, correctArray) {


            $scope.data = {};

            if (bool == true) {
                if (taskNumber == 3) {
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

            else {
                var feedback1 = $rootScope.trans["PERIODIC_FEEDBACK1"];
                var feedback2 = $rootScope.trans["PERIODIC_FEEDBACK2"];
                var feedback3 = $rootScope.trans["PERIODIC_FEEDBACK3"];
                var feedback4 = $rootScope.trans["PERIODIC_FEEDBACK4"];


                for (var i = correctArray.length- 1; i >= 0; i--) {
                    if (feedback3.length == 2 && correctArray[i] == 1) {
                        feedback3 = (i + 1) + $rootScope.trans["PERIODIC_FEEDBACK5"] + feedback3;
                        feedback1 += $rootScope.trans["PERIODIC_FEEDBACK6"];;
                        feedback2 += $rootScope.trans["PERIODIC_FEEDBACK6"];;
                    }
                    else if (feedback3.length == 0 && correctArray[i] == 1) {
                        feedback3 = " " + (i + 1) + feedback3;
                    }

                    else if (correctArray[i] == 1) {
                        feedback3 = (i + 1) + ", " + feedback3;
                    }

                }

                if (feedback3.length == 0) {
                    feedback1 = $rootScope.trans["PERIODIC_FEEDBACK7"];
                    feedback2 = "";
                    feedback3 = "";
                    feedback4 = "";
                }
                else if (feedback3.length == 2) {
                    feedback1 += $rootScope.trans["PERIODIC_FEEDBACK8"];
                }
                var pop = {
                    title: "FEIL",
                    subTitle: feedback1 + feedback2 + feedback3 + feedback4,
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>Prøv igjen</b>',
                            type: 'button-positive',

                            onTap: function () {


                            }

                        }
                    ]
                }

            }

            var myPopup = $ionicPopup.show(pop);

            myPopup.then(function (res) {
                console.log('Tapped!', res);
            });
        }

        function checkTriangle() {
            var rettArray = [0, 0, 0, 0, 0];
            var antallRett = 0;
            console.log($scope);
            if (document.getElementById("triangle-0").value == 1) {
                rettArray[0] = 1;
                antallRett++;
            }

            if (document.getElementById("triangle-1").value == 2) {
                rettArray[1] = 1;
                antallRett++;
            }
            if (document.getElementById("triangle-2").value == 3) {
                rettArray[2] = 1
                antallRett++;
            }
            if (antallRett == 3) {
                return [true, rettArray];
            }
            return [false, rettArray];

        }

        function checkSquare() {
            var rettArray = [0, 0, 0, 0, 0];
            var antallRett = 0;
            if (document.getElementById("square-0").value == 1) {
                rettArray[0] = 1;
                antallRett++;
            }
            if (document.getElementById("square-1").value == 2) {
                rettArray[1] = 1;
                antallRett++;
            }

            if (document.getElementById("square-2").value == 3) {
                rettArray[2] = 1;
                antallRett++;
            }
            if (document.getElementById("square-3").value == 4) {
                rettArray[3] = 1;
                antallRett++;
            }
            if (antallRett == 4) {
                return [true, rettArray]
            }

            return [false, rettArray];
        }

        function checkPentagon() {
            var rettArray = [0, 0, 0, 0, 0];
            var antallRett = 0;
            if (document.getElementById("penta-0").value == 1) {
                rettArray[0] = 1;
                antallRett++;
            }
            if (document.getElementById("penta-1").value == 2) {
                rettArray[1] = 1;
                antallRett++;
            }
            if (document.getElementById("penta-2").value == 3) {
                rettArray[2] = 1;
                antallRett++;
            }
            if (document.getElementById("penta-3").value == 4) {
                rettArray[3] = 1;
                antallRett++;
            }
            if (document.getElementById("penta-4").value = 5) {
                rettArray[4] = 1;
                antallRett++;
            }
            // HER MÅ DET HÅNDTERES OM SPILLET ER FERDIG!!
            if (antallRett == 5) {
                return [true, rettArray]
            }

            return [false, rettArray];
        }


    });