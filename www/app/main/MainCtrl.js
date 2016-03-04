angular.module('app.main')
.controller('MainCtrl', function($scope, $stateParams) {

    $scope.parts = [
        {name: "Hode", image: "hode.png", collected: false},
        {name: "Armer", image: "hode.png", collected: true},
        {name: "Bein", image: "hode.png", collected: false},

        {name: "Hjerne", image: "hode.png", collected: true},
        {name: "Overkropp", image: "hode.png", collected: true},
        {name: "Hydraulikk", image: "hode.png", collected: true},
    ]
    
});
