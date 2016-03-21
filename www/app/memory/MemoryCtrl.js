angular.module('app.memory')
.controller('MemoryCtrl', function($scope, $stateParams, $ionicPopup) {

  var greenButton = document.getElementById("memorygreen");
  var pinkButton = document.getElementById("memorypink");
  var yellowButton = document.getElementById("memoryyellow");
  var orangeButton = document.getElementById("memoryorange");
  var startButton = document.getElementById("startButton");

  var numberOfWins = 0;
  var clickNumber = 0;
  var gameList = [];
  var clicked = [];


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
    numberOfWins+=1;
    startButton.style.display = "block"
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

  function checkIfWon(click, game){
    if(!(click[clickNumber] === game[clickNumber])){
      clickNumber = 0;
      $ionicPopup.show({
        title: 'Du tapte',
        scope: $scope,
        buttons: [
          { text: '<b>Start på nytt</b>',
            type: 'button-positive',
            onTap: function() {
              startButton.style.display = "block"
            }
          }
        ]
      });
    }
    if(click.length === game.length) {
      gameWon();
    }
  }




  $scope.startGame = function(){
    clickNumber = 0;
    gameList = [];
    clicked = [];
    gameList = initGame((numberOfWins+1)*3);
    startButton.style.display = "none";
    var i = 0;
    console.log(gameList);
    console.log(clicked);
    var opa = setInterval(function(){
      console.log(gameList[i])
      if(i > gameList.length){
        activateButtons();
        clearInterval(opa);
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
  };





});
