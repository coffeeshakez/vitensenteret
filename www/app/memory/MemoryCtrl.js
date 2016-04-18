angular.module('app.memory')
.controller('MemoryCtrl', function($scope, $rootScope, $ionicPopup, $state, $timeout, $interval) {

  var numberOfWins = 0;
  var clickNumber = 0;
  var gameList = [];
  var clicked = [];
  var numberOfLost = 0;

  var normalPopup = {
    title: "Du klarte dette nivået",
    scope: $scope,
    buttons: [
      { text: "<b>Neste nivå</b>",
        type: "button-positive",
        onTap: changeLevelNumerator}
    ]
  };

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

  $scope.levelNumerator = "Nivå " + (numberOfWins+1) + "/3";
  $scope.gameStarted = false;
  $scope.gameLost = true;

  $scope.gameFailedThreeTimes = true;

  $scope.clickMemoryButton;

  $scope.buttons = [
    {class:'pink', active: false},
    {class:'green', active: false},
    {class:'orange', active: false},
    {class:'yellow', active: false}
  ];

  function blink(button, time){
    button.active = true;
    $timeout(function(){
      button.active = false;
    }, time)
  }

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

  function changeLevelNumerator(){
    $scope.levelNumerator = "Nivå " + (numberOfWins+1) + "/3";
  }

  function initGame(number){
    var game = [];
    for(i = 0; i<number; i++){
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
      if (i > 0 && game[i] == game[i-1]){
        game.pop();
        i--;
      }
    }
    return game;
  }



  function activateButtons(){
    clicked = [];
    $scope.clickMemoryButton = function(button){
      blink(button, 300);
      clicked.push(button.class);
      checkIfWon(clicked, gameList);
      clickNumber+=1;
    };
  }

  function deactivateButtons(){
    $scope.clickMemoryButton = null;
  }

  function gameWon(){
    clickNumber = 0;
    numberOfLost = 0;
    numberOfWins+=1;
    $scope.gameStarted = false;
    $scope.gameFailedThreeTimes = true;
    deactivateButtons();
    if(numberOfWins === 3){
      $ionicPopup.show(hasWonPopup)
    }
    else{
      $ionicPopup.show(normalPopup)
    }
  }

  function checkIfWon(){
    if(!(clicked[clickNumber] === gameList[clickNumber])){
      deactivateButtons();
      clickNumber = 0;
      $ionicPopup.show(lostGamePopup);
    }
     else if(clicked.length === gameList.length) {
      gameWon();
    }
  }

  function runGame(){
    var i = 0;
    var interval = $interval(
        function(){
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

  $scope.startGame = function(){
    $scope.gameStarted = true;
    clickNumber = 0;
    clicked = [];
    gameList = initGame((numberOfWins+3));
    runGame();
  };

  $scope.redoGame = function(){
    clickNumber = 0;
    clicked = [];
    $scope.gameLost = true;
    runGame();
    if(numberOfLost >=3){
      $scope.gameFailedThreeTimes = false;
    }

  };

  $scope.getHint = function(){
    blinkCorrectButton(clicked.length);
  }

});
