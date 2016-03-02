angular.module('app.main')
.controller('MainCtrl', function($scope, $stateParams) {
    $scope.variable = false;
    $scope.slider = {red: 100, green: 100, blue: 101}

    $scope.buttons = [
        {name: "Hode", image: "hode.png", collected: false},
        {name: "Armer", image: "hode.png", collected: true},
        {name: "Bein", image: "hode.png", collected: false},

        {name: "Hjerne", image: "hode.png", collected: true},
        {name: "Overkropp", image: "hode.png", collected: true},
        {name: "Hydraulikk", image: "hode.png", collected: true},
    ]

    $scope.exampleFunc = function(r, g, b){
        var desired = {r: 50, g: 50, b: 50};
        var error_margin = 20;

        if(isNear(r, desired.r, error_margin)  && isNear(g, desired.g, error_margin) && isNear(b, desired.b, error_margin)){
            $scope.variable = true;
            return true;
        }else{
            $scope.variable = false;
            return false;
        }
    }

    function isNear(input, desired, error_margin){
        return input >= desired - error_margin && input <= desired + error_margin;
    }
});
