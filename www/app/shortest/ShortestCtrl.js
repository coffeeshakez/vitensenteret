angular.module('app.shortest')
.controller('ShortestCtrl', function($scope, $stateParams) {
    $scope.variable = false;
    $scope.slider = {red: 100, green: 100, blue: 100}

    $scope.shortestList = [
        {name: "Hode", image: "hode.png", collected: false},
        {name: "Skulder", image: "hode.png", collected: true},
        {name: "Kne", image: "hode.png", collected: false},
        {name: "Tå", image: "hode.png", collected: true},
    ]

    $scope.shortestFunc = function(r, g, b){
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
