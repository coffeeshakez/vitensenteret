angular.module('app.parts')
.controller('PartsCtrl', function($scope, $rootScope, $stateParams) {

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

    $scope.partClick = function(part, dir){
        part.variant += dir;
        if (part.variant >= part.variants.length){
            part.variant = part.variants[0];
        }
        else if (part.variant < part.variants[0]){
            part.variant = part.variants[part.variants.length-1];
        }
    }

    $scope.partToggle = function(part){
        part.collected ^= true;
    }
});
