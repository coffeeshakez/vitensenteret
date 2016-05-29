angular.module('app.sound')
.controller('soundCtrl', function($scope, $rootScope, $stateParams,$ionicPlatform, $ionicPopup, $state) {
    var sangen= document.getElementById("song");
    var viewInsert = document.getElementById("soundView");
    var taskNumber = 0;

    //Contains urls to the images, and information about the stages.
    $scope.stages = {
        "triangle": {
            image: "./img/triangle.svg",
            id: "triangle",
            size: [0,1,2],
            selected:[[1,2,3], [1,2,3], [1,2,3]]
        },
        "square": {
            image: "./img/square.svg",
            id: "square",
            size: [0,1,2,3],
            selected:[[1,2,3,4],[1,2,3,4,], [1,2,3,4], [1,2,3,4]]
        },
        "penta": {
            image: "./img/pentagon.svg",
            id: "penta",
            size: [0,1,2,3,4],
            selected:[[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]]
        },
    };



//plays the soud for the current stage
    $scope.playImitate = function(){
		sangen.currentTime = 0;
        sangen.play();
   };


//initiates the first stage
    $scope.initSound = function () {
        initNext();
    }

//Initiates the showPopup() function with the correct parameters
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
    
    //Initiates the next stage.
    function initNext() {
        if (taskNumber == 0) {
            $scope.currentStage = $scope.stages["triangle"];
            $scope.currentStage.selected = [1,2,3];
        }
        else if (taskNumber == 1) {
            $scope.currentStage = $scope.stages["square"];
            $scope.currentStage.selected = [1,2,3,4];
            sangen.src='./sound/viten4.mp3';
        }
        else if (taskNumber == 2) {
            $scope.currentStage = $scope.stages["penta"];
            $scope.currentStage.selected = [1,2,3,4,5];
            sangen.src='./sound/viten5.mp3';
        }
        taskNumber++;

    }

    //Generates and shows popup. Parameter are bool (correct answer), and an array( which pipes are correct)
    function showPopup(bool, correctArray) {
        console.log(taskNumber);


        $scope.data = {};

        if (bool == true) {
            if (taskNumber == 3) {
                var pop = {
                    itle: $rootScope.trans["PERIODIC_FEEDBACK_CORRECT"],
                    subTitle: $rootScope.trans["SOUND_FEEDBACK_CORRECT"],
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>'+$rootScope.trans["SOUND_PRIZE"] + '</b>',
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
                    title: $rootScope.trans["PERIODIC_FEEDBACK_CORRECT"],
                    subTitle: $rootScope.trans["SOUND_FEEDBACK_CORRECT"],
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>'+ $rootScope.trans["WATER_NEXT_LEVEL"] +'</b>',
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
            var feedback1 = $rootScope.trans["SOUND_FEEDBACK1"];
            var feedback2 = $rootScope.trans["SOUND_FEEDBACK2"];
            var feedback3 = $rootScope.trans["SOUND_FEEDBACK3"];
            var feedback4 = $rootScope.trans["SOUND_FEEDBACK4"];


            for (var i = correctArray.length- 1; i >= 0; i--) {
                if (feedback3.length == 2 && correctArray[i] == 1) {
                    feedback3 = (i + 1) + $rootScope.trans["SOUND_FEEDBACK5"] + feedback3;
                    feedback1 += $rootScope.trans["SOUND_FEEDBACK6"];;
                }
                else if (feedback3.length == 0 && correctArray[i] == 1) {
                    feedback3 = " " + (i + 1) + feedback3;
                }

                else if (correctArray[i] == 1) {
                    feedback3 = (i + 1) + ", " + feedback3;
                }

            }

            if (feedback3.length == 0) {
                feedback1 = $rootScope.trans["SOUND_FEEDBACK7"];
                feedback2 = "";
                feedback3 = "";
                feedback4 = "";
            }
            else if (feedback3.length == 2) {
                feedback1 += $rootScope.trans["SOUND_FEEDBACK8"];
            }
            var pop = {
                title: $rootScope.trans["PERIODIC_FEEDBACK_INCORRECT"],
                subTitle: feedback1 + feedback2 + feedback3 + feedback4,
                scope: $scope,
                buttons: [
                    {
                        text: '<b>'+ $rootScope.trans["SOUND_RETRY"] +'</b>',
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
        if (document.getElementById("triangle-0").value == 5) {
            rettArray[0] = 1;
            antallRett++;
        }

        if (document.getElementById("triangle-1").value == 3) {
            rettArray[1] = 1;
            antallRett++;
        }
        if (document.getElementById("triangle-2").value == 4) {
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
        if (document.getElementById("square-0").value == 5) {
            rettArray[0] = 1;
            antallRett++;
        }
        if (document.getElementById("square-1").value == 3) {
            rettArray[1] = 1;
            antallRett++;
        }

        if (document.getElementById("square-2").value == 4) {
            rettArray[2] = 1;
            antallRett++;
        }
        if (document.getElementById("square-3").value == 2) {
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
        if (document.getElementById("penta-4").value == 5) {
            rettArray[4] = 1;
            antallRett++;
        }
        if (antallRett == 5) {
            return [true, rettArray]
        }

        return [false, rettArray];
    }


});