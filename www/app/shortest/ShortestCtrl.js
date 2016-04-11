angular.module('app.shortest').controller('ShortestCtrl', function($scope, $stateParams) {

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
