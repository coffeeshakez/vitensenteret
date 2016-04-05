angular.module('app.sound')
.controller('soundCtrl', function($scope, $stateParams) {
    

    function playImitate(){
        var myAudio = document.getElementById("imitateSound");
        myAudio.play();
    }
});
