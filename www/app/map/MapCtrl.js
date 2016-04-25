angular.module('app.map')
.controller('MapCtrl', function($scope, $stateParams, $ionicScrollDelegate, $ionicSlideBoxDelegate) {4
   $scope.updateSlideStatus = function(slide) {
     var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
     if (zoomFactor == $scope.zoomMin) {
       $ionicSlideBoxDelegate.enableSlide(true);
     } else {
       $ionicSlideBoxDelegate.enableSlide(false);
     }
   };
});
