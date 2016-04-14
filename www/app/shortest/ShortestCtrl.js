angular.module('app.shortest').controller('ShortestCtrl', function($scope, $stateParams) {

    $scope.cities = [
        {name: "Oslo",index:0},
        {name: "Bergen",index:1},
        {name: "Trondheim", index:2},
        {name: "Hønefoss", index:3},
        {name: "Drammen", index:4},
        {name: "Bodø",  index:5},
        {name: "Tromsø",  index:6},
    ]

    $scope.models = {
        selected: null,
        lister: {"A": []}
    };

    for (var i = 1; i <= 3; ++i) {
        $scope.models.lister.A.push({label: "Item A" + i});
    }

    // Model to JSON for demo purpose
    // $scope.$watch('models', function(model) {
    //     $scope.modelAsJson = angular.toJson(model, true);
    // }, true);
});
