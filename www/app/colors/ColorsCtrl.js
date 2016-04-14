angular.module('app.colors')
.controller('ColorsCtrl', function($scope, $stateParams) {
    $scope.slider = {red: 100, green: 100, blue: 100}

    $scope.locks = [
        {name: "Hode", image: "hode.png", collected: false},
    ]

    $scope.checkColor = function(r, g, b){
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
