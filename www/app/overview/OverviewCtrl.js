angular.module('app.overview')
.controller('OverviewCtrl', function($scope, $stateParams) {

    $scope.parts = [
        {name: "Hode", type: "head", variants: [1, 2, 3], variant: 3, collected: false},
        {name: "Armer", type: "arms", variants: [1, 2, 3], variant: 1, collected: false},
        {name: "Bein", type: "legs", variants: [1, 2, 3, 4], variant: 1, collected: false},
        {name: "Overkropp", type: "body", variants: [1, 2], variant: 2, collected: true},
    ];

    $scope.collectedPartsCount = function(){
        var count = 0;
        angular.forEach($scope.parts, function(part){
            count += part.collected ? 1 : 0;
        });
        return count; 
    }
    
    $scope.partClasses = function(part){
        var collected = part.collected ? 'part-collected' : 'part-not-collected';
        var type = part.type;
        var variant = type+part.variant;
        return type + " " + variant + " " + collected;
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
