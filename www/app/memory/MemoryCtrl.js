angular.module('app.memory')
.controller('MemoryCtrl', function($scope, $ionicPopup, $state) {


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

  $scope.levelNumerator = "Nivå " + (numberOfWins+1) + "/3";

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
            $state.go("index.reward", {"game": "minnespillet", "part": "venstre robotarm", "sprite": "sprite arm arm1"});
        }}
    ]
  };

  function changeLevelNumerator(){
    $scope.levelNumerator = "Nivå " + (numberOfWins+1) + "/3";
  }



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
    $state.go("index.reward", {"game": "minnespillet", "part": "venstre robotarm", "sprite": "sprite arms arms1"});
    clickNumber = 0;
    clicked = [];
    gameList = initGame((numberOfWins+3));
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
