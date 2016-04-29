angular.module('app.map')
.controller('MapCtrl', function($scope, $stateParams, $ionicScrollDelegate, $ionicSlideBoxDelegate) {
    $scope.zoomMin = 1;
   $scope.updateSlideStatus = function(slide) {
     var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle0').getScrollPosition().zoom;
     if (zoomFactor == $scope.zoomMin) {
       $ionicSlideBoxDelegate.enableSlide(true);
     } else {
       $ionicSlideBoxDelegate.enableSlide(false);
     }
   };
});
