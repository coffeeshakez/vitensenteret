angular.module('app.chooseLanguage', [])

angular.module('app.example', [])

angular.module('app.welcomeScreen', [])

angular.module('app.chooseLanguage')
.controller('ChooseLanguageCtrl', function($scope, $stateParams) {
    $scope.variable = false;
    $scope.slider = {red: 100, green: 100, blue: 100}

    $scope.exampleList = [
        {name: "Hode", image: "hode.png", collected: false},
        {name: "Skulder", image: "hode.png", collected: true},
        {name: "Kne", image: "hode.png", collected: false},
        {name: "Tå", image: "hode.png", collected: true},
    ]

    $scope.exampleFunc = function(r, g, b){
        var desired = {r: 50, g: 50, b: 50};
        var error_margin = 20;

        if(isNear(r, desired.r, error_margin)  && isNear(g, desired.g, error_margin) && isNear(b, desired.b, error_margin)){
            $scope.variable = true;
            return true;
        }else{
            $scope.variable = false;
            return false;
        }
    }

    function isNear(input, desired, error_margin){
        return input >= desired - error_margin && input <= desired + error_margin;
    }
});

angular.module('app.example')
.controller('ExampleCtrl', function($scope, $stateParams) {
    $scope.variable = false;
    $scope.slider = {red: 100, green: 100, blue: 100}

    $scope.exampleList = [
        {name: "Hode", image: "hode.png", collected: false},
        {name: "Skulder", image: "hode.png", collected: true},
        {name: "Kne", image: "hode.png", collected: false},
        {name: "Tå", image: "hode.png", collected: true},
    ]

    $scope.exampleFunc = function(r, g, b){
        var desired = {r: 50, g: 50, b: 50};
        var error_margin = 20;

        if(isNear(r, desired.r, error_margin)  && isNear(g, desired.g, error_margin) && isNear(b, desired.b, error_margin)){
            $scope.variable = true;
            return true;
        }else{
            $scope.variable = false;
            return false;
        }
    }

    function isNear(input, desired, error_margin){
        return input >= desired - error_margin && input <= desired + error_margin;
    }
});

/*angular.module('example')
.factory( 'Example', [ 'Resource', function( $resource ) {
    return $resource( 'companies/:id/', { id: '@id', page: '@page' } );
}])
*/
angular.module('app.example')
.directive('exampleDirective', function () {
  return {
    restrict: 'AE',
    scope: {
      'exampleScopeValueIneedForThisDirectiveGivenAsAttrOrInScope': '='
    },
    link: function(scope, elem, attrs){
      //do controller stuff here, like changing elements and getting data
    },
    templateUrl: 'app/example/views/exampleDirective.html'
  };
});

angular.module('app.welcomeScreen', ["ionic"])
.controller('WelcomeCtrl', function($scope, $ionicPopup) {

    $scope.showPopup = function() {
        $scope.data = {};

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            title: 'Informasjon',
            subTitle:   "Hei, Rob og Otto her! " +
                        "Vi ønsker å adoptere en robot og trenger derfor din hjelp. " +
                        "Rundt omkring i utstillingen er det mange robotdeler, men de er dessverre låst inne." +
                        "For å robotdelene fri må du løse diverse oppgaver og spill ved hjelp av smarttelefonen din og utstilling." +
                        "Klarer du å lage den kuleste roboten?",
            scope: $scope,
            buttons: [
                { text: 'Avbryt' },
                {
                    text: '<b>Kom i gang!</b>',
                    type: 'button-positive',
                    onTap: function(e) {

                    }
                }
            ]
        });

        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });

    };

});
