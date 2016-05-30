angular.module('app.quiz')
.controller('quizController', function($scope, $rootScope, $stateParams, $ionicPopup) {
  //controller for the quiz minigame

      //definitions of quiz questions, with the question text defined in the app/overview/translations.js file
      $scope.questions = [
        {
          question: $rootScope.trans["QUIZ_QUESTION1"],
          alternatives: ["Elisha H. Collier", "John Evans", "Samuel Colt", "George W. Bush"],
          correct: 2,
          answeredCorrectly: false,
        },

        {
          question:$rootScope.trans["QUIZ_QUESTION2"],
          alternatives: ["Allessandro Volta", "Samuel Colt", "Alfred Nobel", "Percy Shaw"],
          correct: 2,
          answeredCorrectly: false,
        },

        {
          question: $rootScope.trans["QUIZ_QUESTION3"],
          alternatives: ["Earle Dickson", "Joseph J. Nièpce", "Gregory Pincus", "Gallileo Galilei"],
          correct: 3,
          answeredCorrectly: false,
        },

        {
         question: $rootScope.trans["QUIZ_QUESTION4"],
          alternatives: ["Samuel Colt", "Walther Hunt", "Gregory Pincus & John Rock", "Samuel B. Fay"],
          correct: 1,
          answeredCorrectly: false,
        },

        {
        question: $rootScope.trans["QUIZ_QUESTION5"],
          alternatives: ["Michael Faraday", "Walther Hunt", "Gallileo Gallielei", "Percy Shaw"],
          correct: 0,
          answeredCorrectly: false,
        },

        {
        question: $rootScope.trans["QUIZ_QUESTION6"],
          alternatives: ["Samuel Colt", "Alfred Nobel", "Joseph J. Nièpce", "Allessandro Volta"],
          correct: 3,
          answeredCorrectly: false,
        },

        {
        question: $rootScope.trans["QUIZ_QUESTION7"],
          alternatives: ["Samuel B. Fay", "Samuel Colt", "Earle Dickson", "Gregory Pincus & John Rock"],
          correct: 2,
          answeredCorrectly: false,
        },

        {
        question: $rootScope.trans["QUIZ_QUESTION8"],
          alternatives: ["Alfred Nobel", "Percy Shaw", "Samuel Colt", "Walther Hunt"],
          correct: 1,
          answeredCorrectly: false,
        },

        {
        question: $rootScope.trans["QUIZ_QUESTION9"],
          alternatives: ["Samuel B. Fay", "Joseph J. Nièpce", "Percy Shaw", "Michael Faraday"],
          correct: 0,
          answeredCorrectly: false,
        },

        {
        question: $rootScope.trans["QUIZ_QUESTION10"],
          alternatives: ["Samuel B. Fay", "Joseph J. Nièpce", "Percy Shaw", "Earle Dickson"],
          correct: 1,
          answeredCorrectly: false,
        },

        {
        question: $rootScope.trans["QUIZ_QUESTION11"],
          alternatives: ["Percy Shaw", "Gregory Pincus & John Rock", "Earle Dickson", "Alfred Nobel"],
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

  //checks if given answer is correct
  $scope.checkAnswer = function(answer)
  {


    if(answer == $scope.ask.alternatives[$scope.ask.correct])
    {
      console.log("Riktig");
      var pop = preparePopup($rootScope.trans["QUIZ_CORRECT"], $rootScope.trans["QUIZ_FEEDBACK_CORRECT"]);
      $scope.questions[$scope.qNum].answeredCorrectly = true;

    }
    else
    {
      var pop = preparePopup($rootScope.trans["QUIZ_WRONG"], $rootScope.trans["QUIZ_FEEDBACK_WRONG"]);
    }

    var myPopup = $ionicPopup.show(pop);
    myPopup.then(function() {
         console.log('Tapped!');
      });
  }

//Checks if the player has answered all questions correctly
function isFinished(){
  
  for(key in $scope.questions){
    var item = $scope.questions[key];

    console.log(item.answeredCorrectly);
    if(!item.answeredCorrectly){
      return false;
    }
  }
  return true;
}

//popup for next question
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

//change data to next question's data
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
});
