angular.module('app.chooseLanguage', [])

angular.module('app.example', [])

angular.module('app.main', [])

angular.module('app.periodic', [])
/*
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/example')

    $stateProvider
    .state('example', {
        abstract: true,
        url: "/example",
        parent: "index", //dont change thiss
        templateUrl: "templates/content.html", //or this
        data: {pageTitle: 'Example'}
    })

    .state('example.default', {
        url: "/",
        views: {
          'example': {
            templateUrl: "app/example/views/default.html",
            controller: 'ExampleCtrl'
          }
        },
        data: {pageTitle: 'Example'}
}])

*/
angular.module('app.quiz', [])

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

angular.module('app.main')
.controller('MainCtrl', function($scope, $stateParams) {
    $scope.variable = false;
    $scope.slider = {red: 100, green: 100, blue: 101}

    $scope.buttons = [
        {name: "Hode", image: "hode.png", collected: false},
        {name: "Armer", image: "hode.png", collected: true},
        {name: "Bein", image: "hode.png", collected: false},

        {name: "Hjerne", image: "hode.png", collected: true},
        {name: "Overkropp", image: "hode.png", collected: true},
        {name: "Hydraulikk", image: "hode.png", collected: true},
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
angular.module('app.periodic')
.controller('periodicCtrl', function($scope, $stateParams) {
    $scope.variable = false;
    $scope.slider = {red: 100, green: 100, blue: 100}

    $scope.buttons = [
        {name: "O", correct: false, index:0},
        {name: "Fe", correct: false, index:1},
        {name: "Ag", correct: false, index:2},
        {name: "Au", correct: false, index:3},
        {name: "Cu", correct: false, index:4},
        {name: "Li", correct: false, index:5},
        {name: "H", correct: false, index:6},
        {name: "C", correct: false, index:7},
        {name: "Pb", correct: false, index:8},
    ]

       $scope.visible = true;

    var nextElement

    // Array that contains the url of all images and indexes in button-array
    var urlAndArray = [
        {name:"battery", url: "../../img/battery.jpg", index:5},
        {name:"gold", url: "../../img/gold.jpg", index:3},
        {name:"diamond", url: "../../img/diamond.jpg", index:7},
    ]; 

    $scope.onInitialize=function(){
        nextElement = urlAndArray[urlAndArray.length-1];
        document.getElementById("periodPic").src = nextElement.url;
        $scope.buttons[nextElement.index].correct=true;
    }

    $scope.submitAnswer=function(answer){

            if(checkCorrect(answer)==true && urlAndArray.length==1){
                alert("Du vant");
            }
            else if(checkCorrect(answer)==true){
                $scope.buttons[nextElement.index].correct=false;
                urlAndArray.pop();
                nextElement = urlAndArray[urlAndArray.length-1];
                document.getElementById("periodPic").src = nextElement.url;
                $scope.buttons[nextElement.index].correct=true;
            }

            else{
                var oldElement = urlAndArray.pop();
                urlAndArray.unshift(oldElement);
                $scope.buttons[nextElement.index].correct=false;
                nextElement = urlAndArray[urlAndArray.length-1];
                document.getElementById("periodPic").src = nextElement.url;
                $scope.buttons[nextElement.index].correct=true;
            }
    }

    function checkCorrect(answer){
        if(answer.index == nextElement.index){
            return(true);
        }
        else{
            return (false);
        }
    }



    

    
});




/*angular.module('example')
.factory( 'Example', [ 'Resource', function( $resource ) {
    return $resource( 'companies/:id/', { id: '@id', page: '@page' } );
}])
*/

angular.module('app.quiz')
.controller('quizController', function($scope, $stateParams) {


      $scope.questions = [
        {
          question: "Hvem oppfant revolveren",
          alternatives: ["Bæsj", "tiss", "promp", "fiz"],
          correct: 0,
        },

        {
          question: "Er du dum?",
          aternatives: ["ja", "nei", "kanskje", "vet ikke"],
          correct: 0,

        }
      ];

  $scope.qNum = 0;
  $scope.ask = $scope.questions[$scope.qNum];
  $scope.data = {
    clientSide: 'ng'
  };

  $scope.checkAnswer = function(answer)
  {
    if(answer == $scope.ask.alternatives[$scope.ask.correct])
    {
      console.log("Riktig");
      $scope.qNum ++;
      document.getElementById("question").innerHTML = $scope.ask;
    }
  }
  
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
