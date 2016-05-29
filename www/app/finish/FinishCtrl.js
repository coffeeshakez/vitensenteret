angular.module('app.finish')
.controller('finishCtrl', function($scope, $rootScope, $http, $state, $stateParams) {
    $rootScope.robot = {};
    var server_url = "http://viten.ntnu.no/robots/";
    
    //submit robot and info to robot list server
    $scope.sendRobot = function(){

        if($rootScope.game.hasFinished && !$rootScope.devMode){
            console.log("already finished")
            return;
        }

        //prepare data for http post
        var data = {
            "robot_name": $rootScope.game.robot.robot_name,
            "player_name": $rootScope.game.robot.player_name,
            "robot": JSON.stringify($rootScope.parts),
        };

        //post to server
        $http.post(server_url, data).then(
        function successCallback(response) {
            console.log("Success:", response);
            $rootScope.game.hasFinished = true;

            //open robot list url
            window.open(server_url, '_system');
            $state.go("index.parts")
            //popup->robot
        }, 
        function errorCallback(response) {
            console.log("Error:", response);
        });
        
    }
    
});
