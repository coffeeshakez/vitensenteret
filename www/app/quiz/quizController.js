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
          correct: 0,
        },
        {
          question: "Hvor mange kopper sukker må du ha med deg på månetur?",
          alternatives: ["10", "20,", "50", "100,2"],
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


