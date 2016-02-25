angular.module('app.controllers', [])
  
.controller('vitensenteretKartCtrl', function($scope) {

})
   
.controller('cartTabDefaultPageCtrl', function($scope) {
    $scope.collectedParts = [
        {name: "Hode", image: "hode.png", collected: false},
        {name: "Skulder", image: "hode.png", collected: true},
        {name: "Kne", image: "hode.png", collected: false},
        {name: "Tå", image: "hode.png", collected: true},
    ]
})
   
.controller('fargelSCtrl', function($scope) {

})
    