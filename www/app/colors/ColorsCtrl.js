angular.module('app.colors')
.controller('ColorsCtrl', function($scope, $state, $rootScope, $stateParams) {
    //controller for the color lock game

    //allowed margin of error when the player guesses colors
    var error_margin = 20;

    $scope.isCorrect = false;

    //initial state of sliders
    $scope.slider = {red: 100, green: 100, blue: 100}

    //colors to be unlocked by player
    $scope.locks = [
        {r: 100, g: 0,   b: 0,   completed: false},
        {r: 0,   g: 50,  b: 50,  completed: false},
        {r: 20,  g: 100, b: 50,  completed: false},
        {r: 0,   g: 70,  b: 70,  completed: false},
        {r: 50,  g: 0,   b: 100, completed: false},
    ]
    $scope.cur = 0;

    $scope.displayLocks = [];
    var default_color = 50;
    for (var i = 0; i < $scope.locks.length; i++) {
        $scope.displayLocks[i] = {r: default_color, g: default_color, b: default_color};
    };

    //returns current lock item
    $scope.desired = function(){
        if($scope.cur > $scope.locks.length - 1){
            $scope.cur = $scope.locks.length - 1;
        }
        return $scope.locks[$scope.cur];
    }

    //run when button clicked. resets vars to next color combindation
    $scope.nextLock = function(){
        if($scope.isCorrect){
            $scope.isCorrect = false;
            $scope.desired().completed = true;
            $scope.displayLocks[$scope.cur] = $scope.desired();

            $scope.cur += 1;
            $scope.slider = {red: 100, green: 100, blue: 100};

            //check if player is done / has won
            if($scope.cur > $scope.locks.length - 1){
                $scope.cur = 0;
                $rootScope.winGame("colors");
            }
        }
    }


    //checks if the sliders are at the correct location. Is run when a slider is changed.
    $scope.checkColors = function(r, g, b){
        var desired = $scope.desired();
        var current = $scope.displayLocks[$scope.cur];
        current.r = r;
        current.g = g;
        current.b = b; 

        //check that each slider is within threshhold
        if(isNear(r, desired.r, error_margin)  && isNear(g, desired.g, error_margin) && isNear(b, desired.b, error_margin)){
            $scope.isCorrect = true;
            return true;
        }else{
            $scope.isCorrect = false;
            return false;
        }
    }

    //helper function for color style generation
    $scope.printColor = function(color){
        return "rgba("+real(color.r)+", "+real(color.g)+", "+real(color.b)+", 1)";
    }

    //Convert slider value to 0-255 color value
    function real(col){
        return Math.ceil(col*2.55);
    }

    //check if color is near desired
    function isNear(input, desired, error_margin){
        return input >= desired - error_margin && input <= desired + error_margin;
    }
});
