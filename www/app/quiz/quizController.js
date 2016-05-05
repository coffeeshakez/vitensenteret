angular.module('app.quiz')
.controller('quizController', function($scope, $rootScope, $stateParams, $ionicPopup) {

      $scope.questions = [
        {
          question: $rootScope.trans[QUIZ_QUESTION1],
          alternatives: ["Elisha H. Collier", "John Evans", "Samuel Colt", "George W. Bush"],
          correct: 2,
          answeredCorrectly: false,
        },

        {
          question:$rootScope.trans[QUIZ_QUESTION2],
          alternatives: ["37", "Abraham Lincoln", "Alfred Nobel", "William Shakespeare"],
          correct: 2,
          answeredCorrectly: false,
        },

        {
          question: $rootScope.trans[QUIZ_QUESTION3],
          alternatives: ["10", "20", "50", "100"],
          correct: 3,
          answeredCorrectly: false,
        },

        {
         question: $rootScope.trans[QUIZ_QUESTION4],
          alternatives: [],
          correct: 1,
          answeredCorrectly: false,
        },

        {
        question: $rootScope.trans[QUIZ_QUESTION5],
          alternatives: [],
          correct: 1,
          answeredCorrectly: false,
        },

        {
        question: $rootScope.trans[QUIZ_QUESTION6],
          alternatives: [],
          correct: 1,
          answeredCorrectly: false,
        },

        {
        question: $rootScope.trans[QUIZ_QUESTION7],
          alternatives: [],
          correct: 1,
          answeredCorrectly: false,
        },

        {
        question: $rootScope.trans[QUIZ_QUESTION8],
          alternatives: [],
          correct: 1,
          answeredCorrectly: false,
        },

        {
        question: $rootScope.trans[QUIZ_QUESTION9],
          alternatives: [],
          correct: 1,
          answeredCorrectly: false,
        },

        {
        question: $rootScope.trans[QUIZ_QUESTION10],
          alternatives: [],
          correct: 1,
          answeredCorrectly: false,
        },

        {
        question: $rootScope.trans[QUIZ_QUESTION11],
          alternatives: [],
          correct: 1,
          answeredCorrectly: false,
        },


      ];

  $scope.totalQ = $scope.questions.length;
  $scope.qNum = 0;
  $scope.ask = $scope.questions[$scope.qNum];
  $scope.qCount = true;
  $scope.qCard = true;
  $scope.qAlt = true;
  $scope.finished = false;

  $scope.data = {
    clientSide: 'ng'

  };

  $scope.checkAnswer = function(answer)
  {


    if(answer == $scope.ask.alternatives[$scope.ask.correct])
    {
      console.log("Riktig");
      var pop = preparePopup("Riktig", "Hurra, du svarte riktig")
      $scope.questions[$scope.qNum].answeredCorrectly = true;

    }
    else
    {
      var pop = preparePopup("Feil", "Dette var vel ikke helt riktig, vel?")
    }

    var myPopup = $ionicPopup.show(pop);
    myPopup.then(function() {
         console.log('Tapped!');
      });
  }

function isFinished(){
  console.log("isfinished kjører");
  for(key in $scope.questions){
    var item = $scope.questions[key];

    console.log(item.answeredCorrectly);
    if(!item.answeredCorrectly){
      return false;
    }
  }
  return true;
}
function preparePopup(title, subTitle) {
  var pop =
  {
    title: title,
    subTitle: subTitle,
    scope: $scope,
    buttons: [
      {
        text: '<b>Neste spørsmål!</b>',
        type: 'button-positive',
        onTap: function (e) {
            askNextQuestion();
        }
      }
    ]
  };
  return pop;
}

function askNextQuestion(){

  if(isFinished()){
    $rootScope.winGame("quiz");
    return;
  }
  $scope.qNum ++;
  if($scope.qNum > $scope.questions.length - 1){
    $scope.qNum = 0;
  }

  if($scope.questions[$scope.qNum].answeredCorrectly ){
    askNextQuestion();
  }
  else{
    $scope.ask = $scope.questions[$scope.qNum];
  }
}

function showFinishedScreen(){
  $scope.qCount = false;
  $scope.qCard = false;
  $scope.qAlt = false;
  $scope.finished = true;
}
});
