angular.module('app.example', [])

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



