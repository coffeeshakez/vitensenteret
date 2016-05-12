angular.module('app.finish')
.controller('finishCtrl', function($scope, $rootScope, $http, $state, $stateParams) {
    $rootScope.robot = {};
    var server_url = "http://localhost/vitensenteret_server/";
    
    $scope.sendRobot = function(){

        if($rootScope.game.hasFinished){
            console.log("already finished")
            return;
        }

        var data = {
            "robot_name": $rootScope.game.robot.robot_name,
            "player_name": $rootScope.game.robot.player_name,
            "robot": JSON.stringify($rootScope.parts),
        };

        $http.post(server_url, data).then(
        function successCallback(response) {
            console.log("Success:", response);
            $rootScope.game.hasFinished = true;
            $state.go("index.parts")
            //popup->robot
        }, 
        function errorCallback(response) {
            console.log("Error:", response);
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
