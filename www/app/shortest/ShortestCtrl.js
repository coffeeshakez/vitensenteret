angular.module('app.shortest').
controller('ShortestCtrl', function($scope, $stateParams, $ionicPopup,  $rootScope) {

    $scope.cities = [
        {name: "Londen",  index:1},
        {name: "Brußel",  index:0},
        {name: "Paris", index:2},
        {name: "Strasborg", index:3},
        {name: "Dresen", index:4},
        {name: "Erdfurt", index:5},
        {name: "Háborg",index:6},
        {name: "Copenhagen",index:7},
    ]


    var sortable;
    var el;

    $scope.createSortable = function(){
        el = document.getElementById('shortestList');
        sortable = Sortable.create(el);
    }

    $scope.shortestCheckCorrect = function (){
        var numberOfCorrect = 0;
        console.log(sortable);
        var listElements = el.getElementsByTagName("li");
        for(var i=0;i<listElements.length; i++){
            if(listElements[i].value == i){
                listElements[i].style.backgroundColor= "#39C645";
                numberOfCorrect++;
            }
            else{
                listElements[i].style.backgroundColor= "#990000";
            }
        }

        if(numberOfCorrect==listElements.length){
            showPopup();
        }

    }

    function winning(){
        $rootScope.winGame("shortest");
    }



    function showPopup(){
        var pop =
        {
            title: "Gratulerer",
            subTitle: "Du har funnet kortste vei fra Amsterdam til Trondheim",
            scope: $scope,
            buttons: [
                {
                    text: '<b>Trykk på meg!</b>',
                    type: 'button-positive',
                    onTap: function () {
                        winning();
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
