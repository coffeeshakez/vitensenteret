angular.module('app.welcomeScreen', ["ionic"])
.controller('WelcomeCtrl', function($scope, $ionicPopup, $state, $translate, $rootScope ){

    $translate(['WELCOME_POPUP_TITLE', 'WELCOME_TEXT', 'WELCOME_POPUP_CANCEL', 'WELCOME_POPUP_CONTINUE']).then(function (translations) {
        $scope.translations = translations;
    });

    $scope.showPopup = function() {



        var myPopup = $ionicPopup.show({
            title: $scope.translations.WELCOME_POPUP_TITLE,
            subTitle: $scope.translations.WELCOME_TEXT,
            scope: $scope,
            buttons: [
                { text: $scope.translations.WELCOME_POPUP_CANCEL },
                { text: $scope.translations.WELCOME_POPUP_CONTINUE,
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
