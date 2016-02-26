angular.module('app.periodic')
.controller('periodicCtrl', function($scope, $stateParams) {
    $scope.variable = false;
    $scope.slider = {red: 100, green: 100, blue: 100}

    $scope.buttons = [
        {name: "O", image: "hode.png", collected: false},
        {name: "Fe", image: "hode.png", collected: false},
        {name: "Ag", image: "hode.png", collected: false},
        {name: "Au", image: "hode.png", collected: false},
        {name: "Cu", image: "hode.png", collected: false},
        {name: "Li", image: "hode.png", collected: false},
        {name: "H", image: "hode.png", collected: false},
        {name: "C", image: "hode.png", collected: false},
        {name: "N", image: "hode.png", collected: false},
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
