angular.module('app.chooseLanguage')
.controller('ChooseLanguageCtrl', function($scope, $state, $rootScope, localStorageService, $translate) {

    var languageLocal = localStorageService.get('language');

    $scope.$watch('language', function () {
      localStorageService.set('language', $rootScope.language);
    }, true);

    if(languageLocal)
        $rootScope.language = languageLocal;

    $scope.switchTo = function(lang){
        var first = false;
        if(!languageLocal){
            first = true;
        }
        $rootScope.language = lang;
        $translate.preferredLanguage(lang);
        $translate.use(lang);

        $translate('APP_NAME').then(function (headline) {
            console.log("Translated: "+headline)
        });

        console.log("Changed language to: "+$rootScope.language);
        if(first){
            $state.go("index.welcomeScreen");
        }
        else {
            $state.go("index.overview");
        }

    };

});
