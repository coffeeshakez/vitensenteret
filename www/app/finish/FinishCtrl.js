angular.module('app.finish')
.controller('finishCtrl', function($scope, $rootScope, $stateParams) {
    $scope.robot = {};
    
    $scope.sendRobot = function(){
        
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
});
