angular.module('app.memory')
.controller('MemoryCtrl', function($scope, $stateParams) {
  var numberOfWins = 0;
  var greenButton = document.getElementById("memorygreen");
  var pinkButton = document.getElementById("memorypink");
  var yellowButton = document.getElementById("memoryyellow");
  var orangeButton = document.getElementById("memoryorange");
  var startButton = document.getElementById("startButton");
  var gameList = [];
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
  function checkIfWon(click, game){
    console.log("y");
    var numbs = 0;
    for(i=0;i<game.length;i++){
      if (click[i] === game[i]){
        numbs+=1;
      }
    }
    if(numbs === game.length){
      console.log("hdef")
    }
  };
  function playGame() {
    console.log("hello");
    var clicked = [];
    pinkButton.onclick = function () {
      blink(pinkButton, 300);
      clicked.push(1);
      console.log(clicked);
      if(clicked.length == gameList.length && checkIfWon(clicked, gameList)){
        numberOfWins+=1
      }
    };
    greenButton.onclick = function () {
      blink(greenButton, 300);
      clicked.push(2);
      console.log(clicked);
      if(clicked.length == gameList.length && checkIfWon(clicked, gameList)){
        numberOfWins+=1
      }
    };
    orangeButton.onclick = function () {
      blink(orangeButton, 300);
      clicked.push(3);
      console.log(clicked);
      if(clicked.length == gameList.length && checkIfWon(clicked, gameList)){
        numberOfWins+=1
      }
    };
    yellowButton.onclick = function () {
      blink(yellowButton, 300);
      clicked.push(4);
      console.log(clicked);
      if(clicked.length == gameList.length && checkIfWon(clicked, gameList)){
        numberOfWins+=1
      }
    };

  }



  $scope.startGame = function(){
    gameList = initGame((numberOfWins+1)*4);
    console.log(typeof (gameList[0]));
    startButton.style.display = "none";

    var i = 0;
    var opa = setInterval(function(){
      console.log(gameList[i])
      if(i > gameList.length){
        playGame();
        startButton.style.display = "block";
        clearInterval(opa);
      }
      else {
        if(gameList[i] === 1 ){
          pinkButton.style.opacity = "1";
          setTimeout(function(){
            pinkButton.style.opacity = "0.5";
          }, 500)
        }
        else if(gameList[i] == 2){
          greenButton.style.opacity = "1";
          setTimeout(function(){
            greenButton.style.opacity = "0.5";
          }, 500)
        }
        else if(gameList[i] === 3){
          orangeButton.style.opacity = "1";
          setTimeout(function(){
            orangeButton.style.opacity = "0.5";
          }, 500)
        }
        else if(gameList[i] === 4){
          yellowButton.style.opacity = "1";
          setTimeout(function(){
            yellowButton.style.opacity = "0.5";
          }, 500)
        }
        i+=1;
      }
    }, 1000)
  };





});
