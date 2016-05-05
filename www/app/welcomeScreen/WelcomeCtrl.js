angular.module('app.welcomeScreen', ["ionic"])
.controller('WelcomeCtrl', function($scope, $ionicPopup, $state, $rootScope ){

    $scope.showPopup = function() {



        var myPopup = $ionicPopup.show({
            title: $rootScope.trans.WELCOME_POPUP_TITLE,
            subTitle: $rootScope.trans.WELCOME_TEXT,
            scope: $scope,
            buttons: [
                { text: $rootScope.trans.WELCOME_POPUP_CANCEL },
                { text: $rootScope.trans.WELCOME_POPUP_CONTINUE,
                    type: 'button-positive',
                    onTap: function() {
                        console.log($rootScope.trans);
                        $state.go("index.overview");
                    }
                }
            ]
        });
    };
});
