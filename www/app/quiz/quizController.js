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


