angular.module('app.periodic')
.controller('periodicCtrl', function($scope, $rootScope, $stateParams, $ionicPopup) {

    $scope.buttons = [
        {name: "O", correct: false, index:0},
        {name: "Fe", correct: false, index:1},
        {name: "Ag", correct: false, index:2},
        {name: "Au", correct: false, index:3},
        {name: "Cu", correct: false, index:4},
        {name: "Li", correct: false, index:5},
        {name: "H", correct: false, index:6},
        {name: "C", correct: false, index:7},
        {name: "Pb", correct: false, index:8},
    ];

       $scope.visible = true;

    // Array that contains the url of all images and indexes in button-array
    var urlAndArray = [
        {name:"battery", url: "./img/battery.jpg", index:5},
        {name:"gold", url: "./img/gold.jpg", index:3},
        {name:"diamond", url: "./img/diamond.jpg", index:7},
    ]; 

    $scope.onInitialize=function(){
        $scope.nextElement = urlAndArray[urlAndArray.length-1];
        $scope.buttons[$scope.nextElement.index].correct=true;
    }

    $scope.submitAnswer=function(answer){

        var isCorrect = checkCorrect(answer);

        showPopup(isCorrect, answer);

        if(isCorrect == true){
            $scope.buttons[$scope.nextElement.index].correct=false;
            urlAndArray.pop();
            
        }

        else{
            var oldElement = urlAndArray.pop();
            urlAndArray.unshift(oldElement);
            $scope.buttons[$scope.nextElement.index].correct=false;
        }
    }

    function initNextElement(){
        $scope.nextElement = urlAndArray[urlAndArray.length-1];
        $scope.buttons[$scope.nextElement.index].correct=true;
    }



    function checkCorrect(answer){
        if(answer.index == $scope.nextElement.index){
            return(true);
        }
        else{
            return (false);
        }
    }

    function showPopup(isCorrect, answer)  {
        $scope.data = {};

        //var pop = {};

        if(isCorrect==true){
            var pop = {
                title: "RIKTIG!", 
                subTitle:"Du svarte " + tableOfElements[answer.index].name + " \n. Fyll inn tekst om grunnstoffet.",
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Neste spørsmål</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if(isCorrect == true && urlAndArray.length==0){
                                $rootScope.winGame("periodic");
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
                title: 'FEIL!', 
                subTitle:"Du svarte " + tableOfElements[answer.index].name + "\n. Fyll inn tekst om grunnstoffet.",
                scope: $scope,
                buttons: [
                        {
                            text: '<b>Neste spørsmål</b>',
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


