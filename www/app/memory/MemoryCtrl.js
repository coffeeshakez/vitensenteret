/*This is the controller for the memory game, also known as Simon says.*/

angular.module('app.memory')
.controller('MemoryCtrl', function($scope, $rootScope, $ionicPopup, $state, $timeout, $interval) {



  var numberOfWins = 0; // Number of levels that has been beaten
  var clickNumber = 0; // Number of clicks by the user on the current level, after blinking is done
  var gameList = []; // The list which contains what buttons that will be pushed and in what order.
  var clicked = []; // The list which contains what buttons the user has clicked on the current level.
  var numberOfLost = 0; // Number of times the user has lost the current level.

  // The popup which appears when a level is finished
  var normalPopup = {
    title: "Du klarte dette nivået",
    scope: $scope,
    buttons: [
      { text: "<b>Neste nivå</b>",
        type: "button-positive",
        onTap: changeLevelNumerator}
    ]
  };

  //The popup which appears when all levels have been finished
  var hasWonPopup = {
    title: "Du klarte det siste nivået og har dermed vunnet dette spillet",
    scope: $scope,
    buttons: [
      { text: "<b>Videre</b>",
        type: "button-positive",
        onTap: function(){
          $rootScope.winGame("memory");
        }}
    ]
  };

  // The popup which appers when a level has been lost.
  var lostGamePopup = {
    title: 'Du tapte',
    scope: $scope,
    buttons: [
      { text: '<b>Start på nytt</b>',
        type: 'button-positive',
        onTap: function() {
          $scope.gameLost = false;
          numberOfLost+=1;
        }
      }
    ]
  };

  $scope.levelNumerator = "Nivå " + (numberOfWins+1) + "/3"; // Displays how many levels that have been defeated in the view.
  $scope.gameStarted = false; // If the level has started or not
  $scope.gameLost = true; // If the level has been lost or not

  $scope.gameFailedThreeTimes = true; // If the level has been lost three times or more, or not. This is used to give the user the ability to get hints to finish the level.

  $scope.clickMemoryButton;

  // The four buttons that blick and are to be pushed.
  $scope.buttons = [
    {class:'pink', active: false},
    {class:'green', active: false},
    {class:'orange', active: false},
    {class:'yellow', active: false}
  ];

  //The blink function makes the button given as input blink for the time given as input. time is given as milliseconds.
  function blink(button, time){
    button.active = true;
    $timeout(function(){
      button.active = false;
    }, time)
  }

  // Used to make the correct button blink for 500 milliseconds
  function blinkCorrectButton(iterator){
    switch(gameList[iterator]){
      case "pink":
        blink($scope.buttons[0], 500);
        break;
      case "green":
        blink($scope.buttons[1], 500);
        break;
      case "orange":
        blink($scope.buttons[2], 500);
        break;
      case "yellow":
        blink($scope.buttons[3], 500);
        break;
    }

  }

  // Changes how many levels that has been defeated after a level victory.
  function changeLevelNumerator(){
    $scope.levelNumerator = "Nivå " + (numberOfWins+1) + "/3";
  }

  // Initializes the game with "number" as number of times the buttons will blink. The number of times the button blinks is how difficult the level is.
  function initGame(number){
    var game = [];
    for(i = 0; i<number; i++){ // Fills the gamelist with buttonvalues.
      switch (Math.floor(Math.random()*4)+1){
        case 1:
          game.push("pink");
          break;
        case 2:
          game.push("green");
          break;
        case 3:
          game.push("orange");
          break;
        case 4:
          game.push("yellow");
          break;
      }
      if (i > 0 && game[i] == game[i-1]){ // Checks if the any one button is repeated twice.
        game.pop();
        i--;
      }
    }
    return game;
  }



  // Activates the blinking buttons for clicking and checks if the level has been won.
  function activateButtons(){
    clicked = [];
    $scope.clickMemoryButton = function(button){ // Everytime a button is clicked
      blink(button, 300); //the button blinks
      clicked.push(button.class); // and is pushed into the clicked list
      checkIfWon(clicked, gameList); //Check if the level has been won
      clickNumber+=1;
    };
  }

  //Deactivates the buttons for clicking.
  function deactivateButtons(){
    $scope.clickMemoryButton = null;
  }

  // When a level is won.
  function gameWon(){
    clickNumber = 0;
    numberOfLost = 0;
    numberOfWins+=1;
    $scope.gameStarted = false;
    $scope.gameFailedThreeTimes = true;
    deactivateButtons();
    if(numberOfWins === 3){ // show popup
      $ionicPopup.show(hasWonPopup)
    }
    else{
      $ionicPopup.show(normalPopup)
    }
  }

  // Check if the level has been won.
  function checkIfWon(){
    if(!(clicked[clickNumber] === gameList[clickNumber])){ //Check whether the clicked button is the same as the button that blinked.
      deactivateButtons();
      clickNumber = 0;
      $ionicPopup.show(lostGamePopup); // show popup
    }
     else if(clicked.length === gameList.length) {
      gameWon();
    }
  }

  //Starts the blinking of buttons when a game is started.
  function runGame(){
    var i = 0;
    var interval = $interval(
        function(){ // make the buttons blink with 500 milliseconds between every blink.
          if(i >= gameList.length){
            activateButtons();
            $interval.cancel(interval);
          }
          else{
            blinkCorrectButton(i);
            i+=1;
          }
        }, 1000);

  }

  //Function for starting a level.
  $scope.startGame = function(){
    $scope.gameStarted = true; //game started is true
    clickNumber = 0;
    clicked = [];
    gameList = initGame((numberOfWins+3)); //initialize the gamelist
    runGame(); //make the buttons blink
  };

  //If the game was lost, this makes the same level start over again, with  the same buttons blinking in the same order.
  $scope.redoGame = function(){
    clickNumber = 0;
    clicked = [];
    $scope.gameLost = true;
    runGame();
    if(numberOfLost >=3){
      $scope.gameFailedThreeTimes = false;
    }

  };

  //Function for showing a hint. Only possible after failing a level 3 times or more.
  $scope.getHint = function(){
    blinkCorrectButton(clicked.length);
  }

});
