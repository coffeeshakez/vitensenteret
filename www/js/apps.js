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

angular.module('app.waterflow', [])

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

    $scope.parts = [
        {name: "Hode", type: "head", variants: [1, 2, 3], variant: 3, collected: false},
        {name: "Armer", type: "arms", variants: [1, 2, 3], variant: 1, collected: false},
        {name: "Bein", type: "legs", variants: [1, 2, 3, 4], variant: 1, collected: false},
        {name: "Overkropp", type: "body", variants: [1, 2], variant: 2, collected: true},
    ];

    $scope.collectedPartsCount = function(){
        var count = 0;
        angular.forEach($scope.parts, function(part){
            count += part.collected ? 1 : 0;
        });
        return count; 
    }
    
    $scope.partClasses = function(part){
        var collected = part.collected ? 'part-collected' : 'part-not-collected';
        var type = part.type;
        var variant = type+part.variant;
        return type + " " + variant + " " + collected;
    }

    $scope.partClick = function(part){
        if (part.variant >= part.variants.length){
            part.variant = part.variants[0];
        }
        else{
            part.variant += 1;
        }
    }

    $scope.partToggle = function(part){
        part.collected ^= true;
    }
});


/*angular.module('example')
.factory( 'Example', [ 'Resource', function( $resource ) {
    return $resource( 'companies/:id/', { id: '@id', page: '@page' } );
}])
*/
angular.module('app.periodic')
.controller('periodicCtrl', function($scope, $stateParams, $ionicPopup) {
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
    ];

       $scope.visible = true;

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

        var isCorrect = checkCorrect(answer);

        showPopup(isCorrect, answer);

            if(isCorrect == true && urlAndArray.length==1){
                Alert("Du Vant!");
            }


            else if(isCorrect == true){
                $scope.buttons[nextElement.index].correct=false;
                urlAndArray.pop();
                
            }

            else{
                var oldElement = urlAndArray.pop();
                urlAndArray.unshift(oldElement);
                $scope.buttons[nextElement.index].correct=false;
            }
    }

    function initNextElement(){
        nextElement = urlAndArray[urlAndArray.length-1];
        document.getElementById("periodPic").src = nextElement.url;
        $scope.buttons[nextElement.index].correct=true;
    }



    function checkCorrect(answer){
        if(answer.index == nextElement.index){
            return(true);
        }
        else{
            return (false);
        }
    }

    function showPopup(isCorrect, answer)  {
        $scope.data = {};

        //var pop = {};

        if(isCorrect==true){
            var pop = {
                title: "RIKTIG!", 
                subTitle:"Du svarte " + tableOfElements[answer.index].name + " \n. Fyll inn tekst om grunnstoffet.",
                scope: $scope,
                buttons: [
                    { text: 'Avbryt' },
                    {
                        text: '<b>Neste spørsmål!</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            initNextElement();
                        }
                    }
                ]
            };
        }

         else{
            var pop = {
                title: 'FEIL!', 
                subTitle:"Du svarte " + tableOfElements[answer.index].name + "\n. Fyll inn tekst om grunnstoffet.",
                scope: $scope,
                buttons: [
                    { text: 'Avbryt' },
                        {
                            text: '<b>Neste spørsmål!</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                initNextElement();
                            }
                        }
                    ]
                };
            }
       

        var myPopup = $ionicPopup.show(pop);
        

        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });


    };



    

    
});




var tableOfElements = [
	{name: "Oksygen", abbr: "O", description: "Oksygen, det puster man"},
	{name: "Jern", abbr: "Fe", description: "Jern. Sånt lager didrik dildoene sine av."},
	{name: "Sølv", abbr: "Ag", description: "Sølv. Første taper."},
	{name: "Gull", abbr: "Au", description: "Ikke like gangstah som platina"},
	{name: "Kobber", abbr: "Cu", description: "Fattigmannsmetall..."},
	{name: "Litium", abbr: "Li", description: "WTF is dis?"},
	{name: "Hydrogen", abbr: "H", description: "Bomber"},
	{name: "Karbon", abbr: "C", description: "Diamanter"},
	{name: "Bly", abbr: "Pb", description: "Ganstere peprer hverandre fulle av det på daglig basis"},
];
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
          alternatives: ["Elisha H. Collier", "John Evans", "Samuel Colt", "George W. Bush"],
          correct: 0,
        },

        {
          question: "Hvor mange fylker er det i Norge?",
          alternatives: ["37", "25", "19", "1000"],
          correct: 2,
        },
        {
          question: "Hvor mange kopper sukker må du ha med deg på månetur?",
          alternatives: ["10", "20", "50", "100,2"],
          correct: 3,
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

      if($scope.qNum <= $scope.questions.length - 1)
      {
        $scope.qNum ++;
        $scope.ask = $scope.questions[$scope.qNum];
      }  
    }
  }
  
});



angular.module('app.waterflow')
.controller('waterflowControl', function($scope, $ionicPopup) {
    var directions = {up:0, right:1, down:2, left:3};
    
    var tubeVariants = [];
    var UpDownTube = {
        id:0,
        src: "img/tubeUpDown.png",
        inputDirection: directions.up,
        outputDirection: directions.down,
        animationSprites: ["img/tubeUpDown.png", "img/tubeUpDownHalf.png", "img/tubeUpDownFULL.png"],
        spriteCount: 3,
    };
    var UpRightTube= {
        id:1,
        src: "img/tubeUpRight.png",
        inputDirection: directions.up,
        outputDirection: directions.right,
        spriteCount: 1,
    };
    var UpLeftTube= {
        id:2,
        src: "img/tubeUpLeft.png",
        inputDirection: directions.up,
        outputDirection: directions.left,
        spriteCount: 1,
    };

    var startTube = {
        id:3,
        src: "img/tube.jpg",
        outputDirection: directions.down,
        spriteCount: 1,
    }
    var endTube = {
        id:4,
        src: "img/tube.jpg",
        inputDirection: directions.up,
        spriteCount: 1,
    }
    tubeVariants.push(UpDownTube, UpRightTube, UpLeftTube);
    


    //triggered by ng-click on image. Takes an image object
    $scope.rotateImage = function(image){                              
        image["rotation"] = (image["rotation"]+90)% 360;
        image["outputDirection"] = (image["outputDirection"]+1)%4;
        image["inputDirection"] = (image["inputDirection"]+1)%4;
        image.classname="rot"+(image["rotation"]);
    };

    function reset(){
        $scope.images = [];
        $scope.loadImages();
    }
    function showPopup(result) {
        $scope.data = {};


        // An elaborate, custom popup
        if(result === true){

            //TODO: Add proper text to popups
            var myPopup = $ionicPopup.show({
                title: 'Informasjon',
                subTitle:   "Yo du klarte det, gratulerre",
                scope: $scope,
                buttons: [
                    {   text: 'Spill igjen',
                        type: 'button-positive',
                        onTap: function(e){
                            reset();
                        }
                    },
                    {   text: '<b>Videre!</b>',
                        type: 'button-positive',
                        onTap: function(e) {

                        }
                    }
                ]
            });
        }else{
            var myPopup = $ionicPopup.show({
                title: 'The flow does not work',
                subTitle:   "Try again?",
                scope: $scope,
                buttons: [
                    {   text: 'Yes', 
                        type: 'button-positive',
                        onTap: function(e) {
                            reset();
                        }
                    },
                    { text: '<b>No!</b>',
                        type: 'button-positive',
                        onTap: function(e) {

                        }
                    }
                ]
            });
        }  

        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
    };

    var animationInterval = null;
    var animationQue = []; 
    $scope.testFlow = function(){
        animationQue = [];
        animationInterval = null;
        var start= $scope.images[0][0];
        console.log("running testFlow");
        for(var i = 0; i < columnCount; i++){
            for(var j = 0; j < rowCount; j++){
                //connectedDirection represents the objects that so far are connected to start. We need this for all elements.
                $scope.images[j][i]["connectedDirection"] = (j == 0 && i == 0) ? 0 : -1;
            }
        }

        var iterationCount = 0;
        var currentElement = start;
        var result = false;
        while(currentElement != false){
            //return true when arriving to destination
            if(currentElement["src"] === "img/tube.jpg" && currentElement != start && currentElement != false){
                console.log("true");
                result = true;
                showPopup(result);
                return result;
            }

            //get next element. The function nextElement will return false if there is no such thing
            else{
                currentElement = nextElement(currentElement);
                //insert animation logic on currentElement here


                animationQue.push({element:currentElement, status:'untreated'});
                
                //Infinate loop check was used for testing.
                iterationCount+=1;
                if(iterationCount > 100){
                    console.log("infinate loop reached");
                    result = false;
                }
            }
        //The tube path does not lead to end node.
        }
        console.log("While loop exited nextElement returned false");
        showPopup(result);
        return result;
    };

    var animationInterval;
    $scope.runAnimationQue = function(result){
        while(animationQue){
            animationInterval = setInterval(AnimationFrame(animationQue.shift()), 1000);
        }
        console.log("running animation que");
    }

    function AnimationFrame(tubeObject){
        console.log("AnimationFrame");
        tubeObject["animationStep"] += 1;
        if(tubeObject["animationStep"] >= tubeObject["animationSprites"].length){
            console.log(tubeObject);
            return true;
        }
        tubeObject["src"] = tubeVariants[tubeObject["tubeID"]].animationSprites[tubeObject["animationStep"]];
    }

    function nextElement(image){
        //log current image
        //Its not that intuitive to use image["outputDirection"] and image["inputDirection"],
        //because the names do not represent the real output and input directions, and the difference between the two is not relevant to the code logic. 
        //The following line sets the real outputDirection to the direction that is not already connected to the flow-path (either image["inputDirection"] or image["outputDirection"]).
        var outputDirection = image["connectedDirection"] == image["outputDirection"] ? image["inputDirection"] : image["outputDirection"];
        var next = image;
        //Set next element to where (real) outputDirection is pointing to.
        try{
            if (outputDirection === directions.down){
                next = $scope.images[image["idY"]+1][image["idX"]];
            }else if (outputDirection == directions.up){
                next = $scope.images[image["idY"]-1][image["idX"]];
            }else if (outputDirection == directions.right){
                next = $scope.images[image["idY"]][image["idX"]+1];
            }else if (outputDirection == directions.left){
                next = $scope.images[image["idY"]][image["idX"]-1];
            }
            //Returnes false if error in selecting next element. Instead of cathing an error it usually just sets the next object to undefined.
        }catch(error){
            console.log("Error in selecting the next element");
            return false;
        }
        //test if next element is undefined to avoid error in following code. 
        if(next === undefined){
            console.log("Element is undefined, probably because it was outside the boundaries of the array");
            return false;
        }
        //The element is pointing to something that is wrongly turned
        if(!(next["outputDirection"] == opposite(outputDirection) || next["inputDirection"] == opposite(outputDirection))){
            console.log("An element is turned incorrectly");
            return false;
        }
        //Wont be triggered, but was used in development. Maybe it will be useful again some day
        if(next["connectedDirection"] >= 0){
            console.log("An element is trying to connect to an already connected element()");
            return false;
        }
        //set the connectedDirection so that the nextElement is connected to the path.
        next["connectedDirection"] = opposite(outputDirection);
        return next;
    };
    opposite = function(int){
        return int >= 2 ? int-2 : int+2;
    }
    var rowCount = 5;
    var columnCount = 5;
    $scope.images = []; 
    $scope.loadImages = function() {
        for(var i = 0; i < columnCount; i++) {
            $scope.images.push([]);
            for(var j = 0; j<rowCount; j++){
                if(i == 0 && j == 0){
                    $scope.images[i].push({tubeID: startTube.id, idX: i, idY:j, rotation: 0, src:startTube.src, inputDirection: 0, outputDirection:startTube.outputDirection, connectedDirection:0,});
                }else if(i == 4 && j == 4){
                    $scope.images[i].push({tubeID: endTube.id, idX: i, idY:j, rotation: 0, src:endTube.src, outputDirection: 3, inputDirection:endTube.inputDirection, connectedDirection:-1,});
                }
                else{
                    var currentTube = pickRandomObjectProperty(tubeVariants);    
                    $scope.images[i].push({
                    tubeID: currentTube.id,
                    idX: j, 
                    idY: i, 
                    rotation: 0, 
                    src: currentTube.src, 
                    inputDirection: currentTube.inputDirection, 
                    outputDirection: currentTube.outputDirection,
                    connectedDirection:-1,
                    animationStep: 0,
                    spriteCount: currentTube.spriteCount,
                    });
                }
            }
        }
    }
    function pickRandomObjectProperty(obj){
        var result;
        var count = 0;
        for (var i in obj){
            if (Math.random() < 1/++count){
                result = i;
            }
        }
        return obj[result];
    }

    function generateBoard(){

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
                { text: '<b>Kom i gang!</b>',
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
