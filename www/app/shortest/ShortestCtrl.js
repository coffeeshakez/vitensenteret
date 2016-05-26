angular.module('app.shortest').
controller('ShortestCtrl', function($scope, $stateParams, $ionicPopup,  $rootScope) {

    $scope.cities = [
        {name: "Paris", index:2},
        {name: "Londen",  index:1},
        {name: "Erdfurt", index:5},
        {name: "Brußel",  index:0},
        {name: "Copenhagen",index:7},
        {name: "Dresen", index:4},
        {name: "Háborg",index:6},
        {name: "Strasborg", index:3},
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
            showPopup(true);
        }
        else if(numberOfCorrect!=listElements.length){
            showPopup(false)
        }

    }

    function winning(){
        $rootScope.winGame("shortest");
    }



    function showPopup(bool){
        if(bool ==true) {
            var pop =
            {
                title: $rootScope.trans["PERIODIC_FEEDBACK_CORRECT"],
                subTitle: $rootScope.trans["SHORTEST_POPUP_CORRECT"],
                scope: $scope,
                buttons: [
                    {
                        text: '<b>'+$rootScope.trans["SOUND_PRIZE"]+'</b>',
                        type: 'button-positive',
                        onTap: function () {
                            winning();
                        }
                    }
                ]
            };
        }
        else if(bool == false){
            var pop =
            {
                title: $rootScope.trans["PERIODIC_FEEDBACK_INCORRECT"],
                subTitle: $rootScope.trans["SHORTEST_POPUP_INCORRECT"],
                scope: $scope,
                buttons: [
                    {
                        text: '<b> '+$rootScope.trans["SOUND_RETRY"]+'</b>',
                        type: 'button-positive',
                        onTap: function () {
                        }
                    }
                ]
            };
        }

        var myPopup = $ionicPopup.show(pop);


        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
    }

});
