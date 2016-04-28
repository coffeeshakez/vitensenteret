angular.module('app.periodic')
.controller('periodicCtrl', function($scope, $rootScope, $stateParams, $ionicPopup) {

    $scope.buttons = [
        {name: "Tinn", abbr: "Sn", description: "Tinn er etter gull, kobber og sølv det lengst kjente og brukte metallet. Tinn finnes som hvit, skinnende og bløtt metall, med smeltepunkt på 231,9 ˚C.Siden tinn er et bløtt metall med lavt smeltepunkt er det lett å forme og velegnet til en rekke formål. På Vitensenteret kan du støype egne figurer av tinn.", correct: false, index:0},
        {name: "Jern", abbr: "Fe", description: "Jern ruster lett og reagerer lett med andre stoffer. Likevel brukes jern mye da det finnes i store mengder og er lett å fremstille.Som regel tilsetter man andre metaller for å gi det bedre egenskaper.",correct: false, index:1},
        {name: "Natrium", abbr: "Na", description: "Natrium er det ene av de to grunnstoffene i vanlig salt, NaCl. Natrium er viktig for overføring av elektriske signaler i nervene våre, men vi bør ikke ha for mye av det." ,correct: false, index:2},
        {name: "Gull", abbr: "Au", description: "Rent gull er veldig bløtt. Derfor legeres det ofte med kobber, platina eller sølv for at det skal bli hardere. Gull er veldig lett å bearbeide, for eksempel kan 1 g gull trekkes til en 3 km lang tråd!", correct: false, index:3},
        {name: "Aluminim", abbr: "Al", description: "Som metall er aluminium veldig allsidig fordi det er lett, ikke ruster; enkelt kan gjøres   hardt. Brukes blant annet i bildeler, dørhåndtak, tuber, vinduskarmer, i ledninger og ikke minst til aluminiumsfolie.", correct: false, index:4},
        {name: "Litium", abbr: "Li", description: "Dette lette metallet er mest kjent fra oppladbare batterier. Energien i batteriet kommer av at litiummetall gjerne vil gi fra seg et elektron, og når vi lader det opp setter vi elektronet tilbake.", correct: false, index:5},
        {name: "Svovel", abbr: "S", description: "Slam i elver som lukter som råtne egg, har sin stank fra forbindelser som inneholder svovel. Den sterke lukten i løk kommer også fra svovelholdige stoffer. Svovel finnes også i naturen som gult pulver. ",correct: false, index:6},
        {name: "Karbon", abbr: "C", description: "Rent karbon finnes i form av grafitt, diamant og noen nanostrukturer. Grafitt er det mørkegrå ”blyet” i blyanter. Alt levende er basert på kjemien til karbon.",correct: false, index:7},
        {name: "Kalsium", abbr: "Ca", description: "Marmor, kritt og kalkstein er alle laget av kalsiumforbindelsen kalsiumkarbonat, CaCO3. Kalkstein brukes også som små partikler i tyggis og tannpasta. Mesteparten av all kalsium i kroppen finnes i beinstrukturen. ", correct: false, index:8},
    ];

       $scope.visible = true;

    // Array that contains the url of all images and indexes in button-array
    var urlAndArray = [
        {name:"tinn", url: "./img/tinn.jpg", index:0},
        {name:"Jern", url: "./img/iron.jpg", index:0},
        {name:"gold", url: "./img/gold.jpg", index:3},
        {name:"battery", url: "./img/battery.jpg", index:5},
        {name:"onion", url: "./img/onion.jpg", index:6},
        {name:"diamond", url: "./img/diamond.jpg", index:7},
        {name:"kalsium", url: "./img/kalsium.jpg", index:8}

    ];

    $scope.onInitialize=function(){
        $scope.nextElement = urlAndArray[urlAndArray.length-1];
        $scope.buttons[$scope.nextElement.index].correct=true;
    }

    $scope.submitAnswer=function(answer){

        var isCorrect = checkCorrect(answer);

        showPopup(isCorrect, answer);

        if(isCorrect == true){
            $scope.buttons[$scope.nextElement.index].correct=false;
            urlAndArray.pop();
            
        }

        else{
            var oldElement = urlAndArray.pop();
            urlAndArray.unshift(oldElement);
            $scope.buttons[$scope.nextElement.index].correct=false;
        }
    }

    function initNextElement(){
        $scope.nextElement = urlAndArray[urlAndArray.length-1];
        $scope.buttons[$scope.nextElement.index].correct=true;
    }



    function checkCorrect(answer){
        if(answer.index == $scope.nextElement.index){
            return(true);
        }
        else{
            return (false);
        }
    }

    function winning(){
        $rootScope.winGame("periodic");
    }

    function showPopup(isCorrect, answer)  {
        $scope.data = {};

        //var pop = {};

        if(isCorrect==true){
            var pop = {
                title: "RIKTIG!", 
                subTitle:"Du svarte " + tableOfElements[answer.index].name + " \n. Fyll inn tekst om grunnstoffet.",
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Neste spørsmål</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if(isCorrect == true && urlAndArray.length==0){
                                winning();
                                return;
                            }
                            initNextElement();
                        }
                    }
                ]
            };
        }

         else{
            var pop = {
                title: 'FEIL!', 
                subTitle:"Du svarte " + tableOfElements[answer.index].name + "\n. Fyll inn tekst om grunnstoffet.",
                scope: $scope,
                buttons: [
                        {
                            text: '<b>Neste spørsmål</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                initNextElement();
                            }
                        }
                    ]
                };
            }
       

        var myPopup = $ionicPopup.show(pop);
        

        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });


    };



    

    
});


