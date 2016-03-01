angular.module('app.periodic')
.controller('periodicCtrl', function($scope, $stateParams) {
    $scope.variable = false;
    $scope.slider = {red: 100, green: 100, blue: 100}

    $scope.buttons = [
        {name: "O", correct: false, index:0},
        {name: "Fe", correct: false, index:1},
        {name: "Ag", correct: false, index:2},
        {name: "Au", correct: false, index:3},
        {name: "Cu", correct: false, index:4},
        {name: "Li", correct: true, index:5},
        {name: "H", correct: false, index:6},
        {name: "C", correct: false, index:7},
        {name: "Pb", correct: false, index:8},
    ]

       $scope.visible = true;

    var correctCounter = 0;
    var nextElement;

    // Array that contains the url of all images and indexes in button-array
    var urlAndArray = [
        {name:"battery", url: "../../img/battery.jpg", index:6},
        {name:"gold", url: "../../img/gold.jpg", index:2},
        {name:"diamond", url: "../../img/diamond.jpg", index:7},
    ];

    $scope.submitAnswer=function(answer){
        if(urlAndArray.length!=0){
            if(checkCorrect(answer)==true){
                correctCounter++;
                nextElement = urlAndArray.pop();
                document.getElementById("periodPic").src = nextElement.url;
                $scope.buttons[answer.index].correct=false;
                $scope.buttons[nextElement.index].correct=true;
            }

            else{
                var oldElement = nextElement;
                urlAndArray.unshift(oldElement);
                nextElement = urlAndArray.pop();
                document.getElementById("periodPic").src = nextElement.url;
                $scope.buttons[answer.index].correct=false;
                $scope.buttons[nextElement.index].correct=true;
            }
        }
        else{
            alert("Du vant");
        }
    }

    function checkCorrect(answer){
        if(answer.correct == true){
            return(true);
        }
        else{
            return (false);
        }
    }



    

    
});


