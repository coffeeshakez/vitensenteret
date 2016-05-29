angular.module('app.periodic')
.controller('periodicCtrl', function($scope, $rootScope, $stateParams, $ionicPopup) {

//List used to generate buttons and set correctness.
    $scope.buttons = [
        {name: "PERIODIC_SN", abbr: "Sn", index:0, correct: false, description:"PERIODIC_SN_DESCRIPTION"},
        {name: "PERIODIC_FE", abbr: "Fe", index:1, correct: false, description:"PERIODIC_FE_DESCRIPTION"},
        {name: "PERIODIC_NA", abbr: "Na", index:2,correct: false, description:"PERIODIC_NA_DESCRIPTION"},
        {name: "PERIODIC_AU", abbr: "Au", index:3, correct: false, description:"PERIODIC_AU_DESCRIPTION"},
        {name: "PERIODIC_AL", abbr: "Al", index:4, correct: false, description:"PERIODIC_AL_DESCRIPTION"},
        {name: "PERIODIC_LI", abbr: "Li", index:5, correct: false, description:"PERIODIC_LI_DESCRIPTION"},
        {name: "PERIODIC_S", abbr: "S", index:6, correct: false, description:"PERIODIC_S_DESCRIPTION"},
        {name: "PERIODIC_C", abbr: "C", index:7, correct: false, description:"PERIODIC_C_DESCRIPTION"},
        {name: "PERIODIC_CA", abbr: "Ca", index:8, correct: false, description:"PERIODIC_CA_DESCRIPTION"}
    ];


    // Array that contains the url of all images and corresponding indexes in button-array
    var urlAndArray = [
        {name:"litium", url: "./img/battery.jpg", index:5},
        {name:"aluminium", url: "./img/aluminum.jpg", index:4},
        {name:"tinn", url: "./img/tinn.jpg", index:0},
        {name:"svovel", url: "./img/onion.jpg", index:6},
        {name:"gull", url: "./img/gold.jpg", index:3},
        {name:"karbon", url: "./img/diamond.jpg", index:7},
        {name:"natrium", url: "./img/salt.jpg", index:2},
        {name:"kalsium", url: "./img/kalsium.jpg", index:8},
        {name:"jern", url: "./img/Iron.jpg", index:1},
    ];


//Init function run. Sets the first element to be correct.
    $scope.onInitialize=function(){
        $scope.nextElement = urlAndArray[urlAndArray.length-1];
        $scope.buttons[$scope.nextElement.index].correct=true;
    }

    //Function run on button click. Checks if correct and sends parameters to showPopoup().
    //Also pops urlAndArray.
    $scope.submitAnswer=function(answer) {
        var isCorrect = answer.correct;
        showPopup(isCorrect, answer);

        if (isCorrect) {
            $scope.buttons[$scope.nextElement.index].correct = false;
            urlAndArray.pop();
        }

        else {
            var oldElement = urlAndArray.pop();
            urlAndArray.unshift(oldElement);
            $scope.buttons[$scope.nextElement.index].correct = false;
        }
    }
    
    //Initializes the next element
    function initNextElement(){
        $scope.nextElement = urlAndArray[urlAndArray.length-1];
        $scope.buttons[$scope.nextElement.index].correct=true;
    }

    //Awards the user with a robot part.
    function winning(){
        $rootScope.winGame("periodic");
    }

    //Shows popup whith feedback regarding the answer
    function showPopup(isCorrect, answer)  {
        $scope.data = {};
        


        if(isCorrect==true){
            var pop = {
                title: $rootScope.trans["PERIODIC_FEEDBACK_CORRECT"],
                subTitle:$rootScope.trans["PERIODIC_ANSWER"] + $rootScope.trans[answer.name] + '. <br>' + $rootScope.trans[answer.description] ,
                //    $scope.buttons[answer.index].description,
                scope: $scope,
                buttons: [
                    {
                        text: '<b>'+$rootScope.trans["PERIODIC_NEXT"]+'</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if(isCorrect == true && urlAndArray.length==0){
                                winning();
                                return;
                            }
                            initNextElement();
                        }
                    }
                ]
            };
        }

         else{
            var pop = {
                title: $rootScope.trans["PERIODIC_FEEDBACK_INCORRECT"],
                subTitle:$rootScope.trans["PERIODIC_ANSWER"] + $rootScope.trans[answer.name] + '.<br>' + $rootScope.trans[answer.description] ,
                scope: $scope,
                buttons: [
                        {
                            text: '<b>'+$rootScope.trans["PERIODIC_NEXT"]+'</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                initNextElement();
                            }
                        }
                    ]
                };
            }
       

        var myPopup = $ionicPopup.show(pop);
        

        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });


    };
});


