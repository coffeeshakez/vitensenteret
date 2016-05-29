angular.module('app.sound')
.directive('sound', function () {
  return {
    restrict: 'AE',
    scope: {
      'exampleScopeValueIneedForThisDirectiveGivenAsAttrOrInScope': '='
    },
    link: function(scope, elem, attrs){
    },
    templateUrl: 'app/sound/views/sound.html'
  };
});
