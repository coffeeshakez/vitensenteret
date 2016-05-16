angular.module('app.chooseLanguage')
.controller('ChooseLanguageCtrl', function($scope, $state, $rootScope, localStorageService) {

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

        if ($rootScope.language === "no"){
            console.log("Norwegian selected");
            $rootScope.trans = norwegian;
        }
        else if ($rootScope.language === "en"){
            console.log("English selected");
            $rootScope.trans = english;
        }
        else{
            $rootScope.trans = english;
            console.log("English fallback.");
        }

        console.log("Chosen language: "+$rootScope.language);
        if(first){
            $state.go("index.welcomeScreen");
        }
        else {
            $state.go("index.overview");
        }

    };

});
