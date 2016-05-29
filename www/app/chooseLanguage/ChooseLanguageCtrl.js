angular.module('app.chooseLanguage')
.controller('ChooseLanguageCtrl', function($scope, $state, $rootScope, localStorageService) {
    //controller for language selection

    //try to get language from localstorage
    var languageLocal = localStorageService.get('language');

    //check for changes to language and store in localstorage
    $scope.$watch('language', function () {
      localStorageService.set('language', $rootScope.language);
    }, true);

    //if set locally set the global value to be that
    if(languageLocal)
        $rootScope.language = languageLocal;

    //switch language to given language. only "en" and "no" allowed.
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
