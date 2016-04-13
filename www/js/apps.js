angular.module('app.chooseLanguage', [])

angular.module('app.example', [])

angular.module('app.memory', [])

angular.module('app.overview', [])

angular.module('app.parts', [])

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

angular.module('app.reward', [])

angular.module('app.sound', [])

angular.module('app.waterflow', [])

angular.module('app.welcomeScreen', [])

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

angular.module('app.chooseLanguage')
.controller('ChooseLanguageCtrl', function($scope, $state) {

    $scope.switchTo = function(){
        $state.go("index.welcomeScreen");

    };

});

angular.module('app.memory')
.controller('MemoryCtrl', function($scope, $stateParams, $ionicPopup) {

  var greenButton = document.getElementById("memorygreen");
  var pinkButton = document.getElementById("memorypink");
  var yellowButton = document.getElementById("memoryyellow");
  var orangeButton = document.getElementById("memoryorange");
  var startButton = document.getElementById("startButton");
  var redoButton = document.getElementById("redoButton");
  var hintButton = document.getElementById("hintButton");


  var numberOfWins = 0;
  var clickNumber = 0;
  var gameList = [];
  var clicked = [];
  var numberOfLost = 0;


  function initGame(number){
    var game = [];
    for(i = 0; i<number; i++){
      game.push(Math.floor(Math.random()*4)+1);
    }
    return game;
  }

  function blink(button, time){
    button.style.opacity = "1";
    setTimeout(function(){
      button.style.opacity = "0.5";
    }, time)
  }

  function activateButtons(){
    clicked = [];
    pinkButton.onclick = function () {
      blink(pinkButton, 300);
      clicked.push(1);
      checkIfWon(clicked, gameList);
      clickNumber+=1;
    };
    greenButton.onclick = function () {
      blink(greenButton, 300);
      clicked.push(2);
      checkIfWon(clicked, gameList);
      clickNumber+=1;

    };
    orangeButton.onclick = function () {
      blink(orangeButton, 300);
      clicked.push(3);
      checkIfWon(clicked, gameList);
      clickNumber+=1;

    };
    yellowButton.onclick = function () {
      blink(yellowButton, 300);
      clicked.push(4);
      checkIfWon(clicked, gameList);
      clickNumber+=1;

    };

  }

  function deactivateButtons(){
    yellowButton.onclick = null;
    orangeButton.onclick = null;
    pinkButton.onclick = null;
    greenButton.onclick = null;
  }

  function gameWon(){
    clickNumber = 0;
    numberOfLost = 0;
    numberOfWins+=1;
    startButton.style.display = "block";
    hintButton.style.display = "none";
    deactivateButtons();
    $ionicPopup.show({
      title: "Du vant spill " + numberOfWins,
      scope: $scope,
      buttons: [
        { text: "<b>Neste spill</b>",
          type: "button-positive"}
      ]
    })
  }

  function checkIfWon(){
    if(!(clicked[clickNumber] === gameList[clickNumber])){
      deactivateButtons();
      clickNumber = 0;
      $ionicPopup.show({
        title: 'Du tapte',
        scope: $scope,
        buttons: [
          { text: '<b>Start på nytt</b>',
            type: 'button-positive',
            onTap: function() {
              redoButton.style.display = "block"
              numberOfLost+=1;
            }
          }
        ]
      });
    }
    if(clicked.length === gameList.length) {
      gameWon();
    }
  }

  function runGame(){
    var i = 0;
    var opacityChange = setInterval(function(){
      if(i >= gameList.length){
        activateButtons();
        console.log("Ready");
        clearInterval(opacityChange);
      }
      else {
        if(gameList[i] === 1 ){
          blink(pinkButton, 500)
        }
        else if(gameList[i] == 2){
          blink(greenButton, 500)
        }
        else if(gameList[i] === 3){
          blink(orangeButton, 500)
        }
        else if(gameList[i] === 4){
          blink(yellowButton, 500)
        }
        i+=1;
      }
    }, 1000)
  }

  $scope.startGame = function(){
    clickNumber = 0;
    clicked = [];
    gameList = initGame((numberOfWins+1)*3);
    startButton.style.display = "none";
    runGame();
  };

  $scope.redoGame = function(){
    clickNumber = 0;
    clicked = [];
    redoButton.style.display = "none";
    runGame();
    if(numberOfLost >=3){
      hintButton.style.display = "block"
    }

  };

  $scope.getHint = function(){
    if(gameList[clicked.length] === 1){
      blink(pinkButton, 500);
    }
    else if(gameList[clicked.length] === 2){
      blink(greenButton, 500);
    }
    else if(gameList[clicked.length] === 3){
      blink(orangeButton, 500);
    }
    else if(gameList[clicked.length] === 4){
      blink(yellowButton, 500);
    }

  }

});

angular.module('app.overview')
.controller('OverviewCtrl', function($scope, $rootScope, $state, $stateParams) {

    $rootScope.minigames = {
        "quiz":      {name: "Quiz", game: "quiz", icon: "ion-help", collected: false},
        "periodic":  {name: "Grunnstoffer", game: "periodic", icon: "ion-nuclear", collected: false},
        "colors":    {name: "Fargelås", game: "colors", icon: "ion-lock-combination", collected: false},
        "sound":    {name: "Melodi", game: "sound", icon: "ion-music-note", collected: false},
        "waterflow": {name: "Flyt", game: "waterflow", icon: "ion-network", collected: false},
        "memory":    {name: "Minnespill", game: "memory", icon: "ion-load-b", collected: false},
        "shortest":  {name: "Korteste vei", game: "shortest", icon: "ion-map", collected: false},

    };

    $scope.collectedMinigamesCount = function(){
        var count = 0;
        angular.forEach($scope.minigames, function(minigame){
            count += minigame.collected ? 1 : 0;
        });
        return count; 
    }
    
    $scope.minigameClasses = function(minigame){
        var collected = minigame.collected ? 'part-collected' : 'part-not-collected';
        var icon = minigame.icon;
        return icon + " " + collected;
    }

    $scope.minigameClick = function(minigame){
        $state.go("index."+minigame.game);
    }

    $scope.minigameToggle = function(minigame){
        minigame.collected ^= true;
    }
});


angular.module('app.parts')
.controller('PartsCtrl', function($scope, $stateParams) {

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
                        text: '<b>Neste spørsmål</b>',
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
                            text: '<b>Neste spørsmål</b>',
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
.controller('quizController', function($scope, $stateParams, $ionicPopup) {

      $scope.questions = [
        {
          question: "Hvem oppfant revolveren?",
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
        },

        {
         question: "test",
          alternatives: ["fem", "ti", "tretti", "tjuefem"],
          correct: 3,
        },
      ];

  $scope.totalQ = $scope.questions.length;
  $scope.qLeft = $scope.questions;
  $scope.qNum = 0;
  $scope.ask = $scope.qLeft[$scope.qNum];
  $scope.data = {
    clientSide: 'ng'
  };

  $scope.checkAnswer = function(answer)
  {
    if(answer == $scope.ask.alternatives[$scope.ask.correct])
    {
      console.log("Riktig");
      var pop = preparePopup("Riktig", "Hurraa, du svarte riktig")
      var myPopup = $ionicPopup.show(pop);
    }
    else{
      var pop = preparePopup("Feil", "Dette var vel ikke helt riktig, vel?")
      var myPopup = $ionicPopup.show(pop);
    }

    myPopup.then(function(res) {
         console.log('Tapped!', res);
      });
  }

function preparePopup(title, subTitle)
  {
    var pop = 
    {
      title: title,
      subTitle: subTitle,
      scope: $scope,
      buttons: 
      [
        { 
          text: '<b>Neste spørsmål!</b>',
          type: 'button-positive',
          onTap: function(e){
            askNextQuestion()
          }
        }
      ]
    }
    return pop;
  }
function askNextQuestion(){

  if($scope.qNum <= $scope.qLeft.length - 1)
      {
        $scope.qNum ++;
        $scope.ask = $scope.questions[$scope.qNum];
      }
      else
      {
          $scope.qNum = 0;
          $scope.ask = $scope.qLeft[$scope.qNum]
      }
}

});

angular.module('app.reward')
.controller('RewardCtrl', function($scope, $ionicHistory) {
  var robotarmer = " robotarmer "
  $scope.onInitialize = function(){
    document.getElementById("robotPart").innerHTML = robotarmer + "&nbsp;";
    document.getElementById("gameFinished").innerHTML = $ionicHistory.backTitle() +"&nbsp;";
    console.log($ionicHistory.backTitle());
  }

});

angular.module('app.sound')
.directive('sound', function () {
  return {
    restrict: 'AE',
    scope: {
      'exampleScopeValueIneedForThisDirectiveGivenAsAttrOrInScope': '='
    },
    link: function(scope, elem, attrs){
      //do controller stuff here, like changing elements and getting data
    },
    templateUrl: 'app/sound/views/sound.html'
  };
});

angular.module('app.sound')
.controller('soundCtrl', function($scope, $stateParams, $ionicPopup, $state) {

    // var src = "../../sound/Ready-Sangen.mp3";
    // var media = new Audio(src);
    var sangen = document.getElementById("song");
    var viewInsert = document.getElementById("soundView");
    var taskNumber = 0;

    $scope.playImitate = function(){

		sangen.currentTime = 0;
        sangen.play();
   };

    $scope.initSound = function () {
        initNext();
    };

    $scope.soundCheckCorrect = function () {
        if(taskNumber==1){
           showPopup(checkTriangle()[0], checkTriangle()[1]);
        }

        else if(taskNumber==2){
            showPopup(checkSquare()[0], checkSquare()[1]);
        }
        else if (taskNumber == 3){
            showPopup(checkPentagon()[0], checkPentagon()[1]);
        }
    }

    function initNext(){
        taskNumber++;
         if(taskNumber==1){
            insertTriangle();
        }

        else if(taskNumber==2){
            insertSquare();
        }
        else if (taskNumber == 3){
            insertPentagon();
        }


    }

    function showPopup(bool, correctArray){




        $scope.data = {};

        if (bool == true){
            if(taskNumber==3) {
                var pop = {
                    title: "RIKTIG!",
                    subTitle: "Du svarte riktig!",
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>Ta i mot din premie!</b>',
                            type: 'button-positive',

                            onTap: function () {
                                $state.go("index.reward", {"game": "lydimitasjonsspillet", "part": "venstre robotarm", "sprite": "sprite arms arms4"});
                            }

                        }
                    ]
                }
            }

            else {
                var pop = {
                    title: "RIKTIG!",
                    subTitle: "Du svarte riktig!",
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>Neste oppgave</b>',
                            type: 'button-positive',

                            onTap: function () {
                                initNext();
                            }

                        }
                    ]
                }
            }
        }

        else{
            var feedback1 = "Dette var ikke helt riktig, du hadde rør";
            var feedback2 = " på posisjon";
            var feedback3 = "";
            var feedback4 = " riktig";

            for(var i=correctArray.length - 1; i>=0; i--){
                if(feedback3.length == 2 && correctArray[i] == 1){
                    feedback3 = (i+1) +  " og " + feedback3;
                    feedback1+= "ene ";
                    feedback2+= "ene ";
                }
                else if(feedback3.length == 0 && correctArray[i] == 1){
                    feedback3 = " " + (i+1) + feedback3;
                }

                else if(correctArray[i] == 1) {
                    feedback3 = (i + 1) + ", " + feedback3;
                }

            }

            if(feedback3.length == 0){
                feedback1 = "Dette var ikke riktig. Du har dessverre ingen rør på riktig posisjon."
                feedback2 = "";
                feedback3 = "";
                feedback4 = "";
            }
            else if(feedback3.length == 2){
                feedback1 += "et "
            }
            var pop = {
                title: "FEIL",
                subTitle:  feedback1 +  feedback2 + feedback3 + feedback4,
                scope: $scope,
                buttons:[
                {
                    text: '<b>Prøv igjen</b>',
                    type: 'button-positive',

                    onTap: function(){


                    }

                    }
                ]
            }

        }

        var myPopup = $ionicPopup.show(pop);

        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
    }


    function insertTriangle(){
       viewInsert.innerHTML = triangle;
   }

   function insertSquare(){
        viewInsert.innerHTML = square;
    }

    function insertPentagon(){
        viewInsert.innerHTML = pentagon;
    }

    function checkTriangle(){
        var rettArray = [0,0,0,0,0];
        var antallRett = 0;
        if(document.getElementById("triangleOne").value == 1) {
            rettArray[0] = 1;
            antallRett++;
        }

        if(document.getElementById("triangleTwo").value == 2) {
            rettArray[1] = 1;
            antallRett++;
        }
        if(document.getElementById("triangleThree").value == 3){
            rettArray[2] = 1
            antallRett++;
        }
        if (antallRett == 3){
            return [true, rettArray];
        }
        return [false,rettArray];

    }

    function checkSquare(){
        var rettArray = [0,0,0,0,0];
        var antallRett =0;
        if (document.getElementById("squareOne").value == 1) {
            rettArray[0] = 1;
            antallRett++;
        }
        if (document.getElementById("squareTwo").value == 2) {
            rettArray[1] = 1;
            antallRett++;
        }

        if (document.getElementById("squareThree").value == 3) {
            rettArray[2] = 1;
            antallRett++;
        }
        if (document.getElementById("squareFour").value == 4) {
            rettArray[3] = 1;
            antallRett++;
        }
        if(antallRett ==4){
            return [true, rettArray]
        }

        return [false, rettArray];
    }

    function checkPentagon(){
        var rettArray = [0,0,0,0,0];
        var antallRett =0;
        if(document.getElementById("pentaOne").value == 1){
            rettArray[0] = 1;
            antallRett++;
        }
        if(document.getElementById("pentaTwo").value == 2){
            rettArray[1] = 1;
            antallRett++;
        }
        if(document.getElementById("pentaThree").value == 3){
            rettArray[2] = 1;
            antallRett++;
        }
        if(document.getElementById("pentaFour").value == 4){
            rettArray[3] = 1;
            antallRett++;
        }
        if (document.getElementById("pentaFive").value = 5) {
            rettArray[4] = 1;
            antallRett++;
        }
            // HER MÅ DET HÅNDTERES OM SPILLET ER FERDIG!!
        if(antallRett == 5){
            return [true, rettArray]
        }

        return [false, rettArray];
    }
});
var triangle =`

    <div id = "ratioDiv">
    <div id = "selectorContainer">
    
    <img src="../../img/triangle.svg" class = "soundPhoto">
     
    
    <select id="triangleOne" class="numberSelector">
        <option value="1" selected>1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>

    <select id="triangleTwo" class="numberSelector">
        <option >1</option>
        <option selected>2</option>
        <option >3</option>
        <option >4</option>
        <option >5</option>        
    </select>

    <select id="triangleThree" class="numberSelector">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3" selected>3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
    </div>
    </div>
    `;


var square = `
   
    <div id = "ratioDiv">
    <div id = "selectorContainer">
     
    <img src="../../img/square.svg" class = "soundPhoto">
   

   	<select id="squareOne" class="numberSelector">
        <option selected>1</option>
        <option >2</option>
        <option >3</option>
        <option >4</option>
        <option >5</option>
    </select>

    <select id="squareTwo" class="numberSelector">
        <option >1</option>
        <option selected>2</option>
        <option >3</option>
        <option >4</option>
        <option >5</option> 
    </select>

    <select id="squareThree" class="numberSelector">
        <option >1</option>
        <option >2</option>
        <option selected>3</option>
        <option >4</option>
        <option >5</option>
    </select>
    
     <select id="squareFour" class="numberSelector">
        <option >1</option>
        <option >2</option>
        <option >3</option>
        <option selected>4</option>
        <option >5</option>
    </select>
    
    </div>
    </div>
    
    `;

var pentagon = `
    <div id = "ratioDiv">
    <div id = "selectorContainer">
    
    <img src="../../img/pentagon.svg" class = "soundPhoto">

   	<select id="pentaOne" class="numberSelector">
        <option selected>1</option>
        <option >2</option>
        <option >3</option>
        <option >4</option>
        <option >5</option>
    </select>

    <select id="pentaTwo" class="numberSelector">
        <option >1</option>
        <option selected>2</option>
        <option >3</option>
        <option >4</option>
        <option >5</option>   
    </select>

    <select id="pentaThree" class="numberSelector">
        <option >1</option>
        <option >2</option>
        <option selected>3</option>
        <option >4</option>
        <option >5</option>
    </select>
    
     <select id="pentaFour" class="numberSelector">
        <option >1</option>
        <option >2</option>
        <option >3</option>
        <option selected>4</option>
        <option >5</option>
    </select>
    
     <select id="pentaFive" class="numberSelector">
        <option >1</option>
        <option >2</option>
        <option >3</option>
        <option >4</option>
        <option selected>5</option>
    </select>
 
    </div>
    </div>
`;
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
.controller('WelcomeCtrl', function($scope, $ionicPopup, $state) {

    $scope.showPopup = function() {

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
                    onTap: function() {
                        $state.go("index.main");
                    }
                }
            ]
        });

        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });

    };

});
