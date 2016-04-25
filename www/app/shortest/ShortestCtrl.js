angular.module('app.shortest').
controller('ShortestCtrl', function($scope, $stateParams, $ionicPopup) {

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

    $scope.shortestCheckCorrect = function (){
        showPopup();
        console.log(sortable);
    }

    function showPopup(){
        var pop =
        {
            title: "Yawlaw",
            subTitle: "Dette funker vettu",
            scope: $scope,
            buttons: [
                {
                    text: '<b>Trykk på meg!</b>',
                    type: 'button-positive',
                    onTap: function () {
                    }
                }
            ]
        };

        var myPopup = $ionicPopup.show(pop);


        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
    }

});
