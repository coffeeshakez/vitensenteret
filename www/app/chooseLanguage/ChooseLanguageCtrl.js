angular.module('app.chooseLanguage')
.controller('ChooseLanguageCtrl', function($scope, $state) {

    $scope.switchTo = function(){
        $state.go("index.welcomeScreen");

    };

});
