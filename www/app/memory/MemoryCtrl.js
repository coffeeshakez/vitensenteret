angular.module('app.memory')
.controller('MemoryCtrl', function($scope, $stateParams) {

  var gameOne = []; //Five buttons
  var gameTwo = []; //Seven buttons
  var gameThree = []; // Ten buttons
  var greenButton = document.getElementById("memorygreen");
  var pinkButton = document.getElementById("memorypink");
  var yellowButton = document.getElementById("memoryyellow");
  var orangeButton = document.getElementById("memoryorange");

  function initGame(game, number){
    for(i = 0; i<number; i++){
      game.push(Math.floor(Math.random()*4)+1);
    }
    console.log(game);

  }


  $scope.startGame = function(){
    var i = 0;
    var opa = setInterval(function(){
      if(i > 4){
        clearInterval(opa);
      }
      if (gameOne[i] === 1){
        pinkButton.style.opacity = "1";
        setTimeout(function(){
          pinkButton.style.opacity = "0.5";
        }, 1000)
        i+=1;
      }
    }, 3000)
  };



  $scope.onInitialize = function(){
    initGame(gameOne, 5);
    initGame(gameTwo, 7);
    initGame(gameThree, 10);

  };


});
