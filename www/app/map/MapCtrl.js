angular.module('app.map')
.controller('MapCtrl', function($scope, $stateParams, $ionicScrollDelegate, $ionicSlideBoxDelegate) {
    //controller for the map view
    $scope.zoomMin = 1;

    //make image zoomable and pannable
    $scope.updateSlideStatus = function(slide) {
        var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle0').getScrollPosition().zoom;
        if (zoomFactor == $scope.zoomMin) {
            $ionicSlideBoxDelegate.enableSlide(true);
        } else {
            $ionicSlideBoxDelegate.enableSlide(false);
        }
    };
});
