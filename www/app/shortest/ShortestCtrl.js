angular.module('app.shortest').
controller('ShortestCtrl', function($scope, $stateParams) {

    $scope.cities = [
        {name: "Copenhagen",index:0},
        {name: "Háborg",index:1},
        {name: "Erdfurt", index:2},
        {name: "Dresen", index:3},
        {name: "Strasborg", index:4},
        {name: "Paris", index:5},
        {name: "Londen",  iinndex:6},
        {name: "Brußel",  index:7},
    ]



    var sortable;
    var el;

    $scope.createSortable = function(){
        el = document.getElementById('shortestList');
        sortable = Sortable.create(el);
    }

});
