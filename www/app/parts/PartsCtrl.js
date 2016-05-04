angular.module('app.parts')
.controller('PartsCtrl', function($scope, $rootScope, $stateParams, $ionicPopup) {

    $rootScope.hasWon = false;

    $scope.$on('$ionicView.enter', function() {
        //Runs every time view is changed to
        $scope.checkWon();
    });

    $scope.collectedPartsCount = function(){
        var count = 0;
        angular.forEach($rootScope.parts, function(part){
            if(part)
                count += part.collected ? 1 : 0;
        });
        return count; 
    }

    $scope.getLength = function(obj) {
        return Object.keys(obj).length;
    }
    
    $scope.partClasses = function(part){
        if(part){
            if(part.collected){
                var collected = 'part-collected';
                var type = part.type;
                var variant = type+part.variant;
                return type + " " + variant + " " + collected;
            }
            else {
                return 'part-not-collected';
            }
        }
        return "";
    }

    $scope.partStyles = function(part){
        if(part.collected){
            var filter = "filter: hue-rotate("+part.hue+"deg) brightness("+part.brightness+");";
            return "-webkit-" + filter + " " + filter;
        }
        return "";
    }

    $scope.partClick = function(part, dir){
        part.variant += dir;
        if (part.variant > part.variants[part.variants.length -1]){
            part.variant = part.variants[0];
        }
        else if (part.variant < part.variants[0]){
            part.variant = part.variants[part.variants.length-1];
        }
    }

    $scope.partToggle = function(part){
        part.collected ^= true;
    }

    $scope.deleteRobotPop = function(){
        $ionicPopup.show({
          title: 'Sikker?',
          scope: $scope,
          buttons: [
            { text: '<b>Avbryt</b>',
              type: 'button-positive',
              onTap: function() {
                return false;
              }
            },
            { text: '<b>SLETT</b>',
              type: 'button-assertive',
              onTap: function() {
                $rootScope.resetGame();
              }
            }
          ]
        });
    }

    $scope.checkWon = function(){
        if($scope.collectedPartsCount() == $scope.getLength($rootScope.parts)){
            if(!$rootScope.hasWon){
                $rootScope.hasWon = true;

                $ionicPopup.show({
                  title: $rootScope.trans.GAME_WON_TITLE,
                  subTitle: $rootScope.trans.GAME_WON_TEXT,
                  scope: $scope,
                  buttons: [
                    { text: $rootScope.trans.GAME_WON_BUTTON,
                      type: 'button-positive',
                      onTap: function() {
                        return false;
                      }
                    }
                  ]
                });
            }
        }
    }
});
