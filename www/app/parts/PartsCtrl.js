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
            var collected = part.collected ? 'part-collected' : 'part-not-collected';
            var type = part.type;
            var variant = type+part.variant;
            return type + " " + variant + " " + collected;
        }
        return "";
    }

    $scope.partClick = function(part){
        if (part.variant >= part.variants.length){
            part.variant = part.variants[0];
        }
        else{
            part.variant += 1;
        }
    }

    $scope.partToggle = function(part){
        part.collected ^= true;
    }
});
