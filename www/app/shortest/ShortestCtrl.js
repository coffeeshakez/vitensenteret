angular.module('app.shortest').
controller('ShortestCtrl', function($scope, $stateParams, $ionicPopup) {

    $scope.cities = [
        {name: "Oslo",index:0},
        {name: "Bergen",index:1},
        {name: "Trondheim", index:2},
        {name: "Hønefoss", index:3},
        {name: "Drammen", index:4},
        {name: "Bodø",  index:5},
        {name: "Tromsø",  index:6},
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
