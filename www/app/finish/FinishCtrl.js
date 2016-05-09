angular.module('app.finish')
.controller('finishCtrl', function($scope, $rootScope, $http, $stateParams) {
    $scope.robot = {};
    var server_url = "http://localhost/viten_site/"
    
    $scope.sendRobot = function(){
        var data = {
            "robot_name": $scope.robot.robot_name,
            "player_name": $scope.robot.player_name,
            "robot": JSON.stringify($rootScope.parts),
        };

        $http.post(server_url, data).success(function(data, status) {
            console.log(data, status);
        });
        
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
