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
