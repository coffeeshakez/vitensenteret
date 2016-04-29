angular.module('app.periodic')
.controller('periodicCtrl', function($scope, $rootScope, $stateParams, $ionicPopup, $translate) {

    // $scope.buttons = [
    //     {name: "Tinn", abbr: "Sn", index:0, correct: false, description: "Tinn er etter gull, kobber og sølv det lengst kjente og brukte metallet. Tinn finnes som hvit, skinnende og bløtt metall, med smeltepunkt på 231,9 ˚C.Siden tinn er et bløtt metall med lavt smeltepunkt er det lett å forme og velegnet til en rekke formål. På Vitensenteret kan du støype egne figurer av tinn."},
    //     {name: "Jern", abbr: "Fe", index:1, correct: false, description: "Jern ruster lett og reagerer lett med andre stoffer. Likevel brukes jern mye da det finnes i store mengder og er lett å fremstille.Som regel tilsetter man andre metaller for å gi det bedre egenskaper."},
    //     {name: "Natrium", abbr: "Na", index:2,correct: false,description: "Natrium er det ene av de to grunnstoffene i vanlig salt, NaCl. Natrium er viktig for overføring av elektriske signaler i nervene våre, men vi bør ikke ha for mye av det." },
    //     {name: "Gull", abbr: "Au", index:3, correct: false,description: "Rent gull er veldig bløtt. Derfor legeres det ofte med kobber, platina eller sølv for at det skal bli hardere. Gull er veldig lett å bearbeide, for eksempel kan 1 g gull trekkes til en 3 km lang tråd!"},
    //     {name: "Aluminim", abbr: "Al", index:4, correct: false,description: "Som metall er aluminium veldig allsidig fordi det er lett, ikke ruster; enkelt kan gjøres   hardt. Brukes blant annet i bildeler, dørhåndtak, tuber, vinduskarmer, i ledninger og ikke minst til aluminiumsfolie."},
    //     {name: "Litium", abbr: "Li", index:5, correct: false,description: "Dette lette metallet er mest kjent fra oppladbare batterier. Energien i batteriet kommer av at litiummetall gjerne vil gi fra seg et elektron, og når vi lader det opp setter vi elektronet tilbake."},
    //     {name: "Svovel", abbr: "S", index:6, correct: false,description: "Slam i elver som lukter som råtne egg, har sin stank fra forbindelser som inneholder svovel. Den sterke lukten i løk kommer også fra svovelholdige stoffer. Svovel finnes også i naturen som gult pulver. "},
    //     {name: "Karbon", abbr: "C", index:7, correct: false,description: "Rent karbon finnes i form av grafitt, diamant og noen nanostrukturer. Grafitt er det mørkegrå ”blyet” i blyanter. Alt levende er basert på kjemien til karbon."},
    //     {name: "Kalsium", abbr: "Ca", index:8, correct: false,description: "Marmor, kritt og kalkstein er alle laget av kalsiumforbindelsen kalsiumkarbonat, CaCO3. Kalkstein brukes også som små partikler i tyggis og tannpasta. Mesteparten av all kalsium i kroppen finnes i beinstrukturen. "},
    // ];


    // $translate.preferredLanguage($rootScope.language);
    // $translate.use($rootScope.language);

    $translate(["PERIODIC_SN_DESCRIPTION",
        "PERIODIC_FE_DESCRIPTION",
        "PERIODIC_NA_DESCRIPTION",
        "PERIODIC_AU_DESCRIPTION",
        "PERIODIC_AL_DESCRIPTION",
        "PERIODIC_LI_DESCRIPTION",
        "PERIODIC_S_DESCRIPTION",
        "PERIODIC_C_DESCRIPTION",
        "PERIODIC_CA_DESCRIPTION"]).then(function(translations){
        $scope.translations = translations;
    });

    $scope.buttons = [
        {name: "Tinn", abbr: "Sn", index:0, correct: false, description:"PERIODIC_SN_DESCRIPTION"},
        {name: "Jern", abbr: "Fe", index:1, correct: false, description:"PERIODIC_FE_DESCRIPTION"},
        {name: "Natrium", abbr: "Na", index:2,correct: false, description:"PERIODIC_NA_DESCRIPTION"},
        {name: "Gull", abbr: "Au", index:3, correct: false, description:"PERIODIC_AU_DESCRIPTION"},
        {name: "Aluminim", abbr: "Al", index:4, correct: false, description:"PERIODIC_AL_DESCRIPTION"},
        {name: "Litium", abbr: "Li", index:5, correct: false, description:"PERIODIC_LI_DESCRIPTION"},
        {name: "Svovel", abbr: "S", index:6, correct: false, description:"PERIODIC_S_DESCRIPTION"},
        {name: "Karbon", abbr: "C", index:7, correct: false, description:"PERIODIC_C_DESCRIPTION"},
        {name: "Kalsium", abbr: "Ca", index:8, correct: false, description:"PERIODIC_CA_DESCRIPTION"}
    ];


    // Array that contains the url of all images and indexes in button-array
    var urlAndArray = [
        {name:"tinn", url: "./img/tinn.jpg", index:0},
        {name:"jern", url: "./img/Iron.jpg", index:1},
        {name:"natrum", url: "./img/salt.jpg", index:2},
        {name:"gull", url: "./img/gold.jpg", index:3},
        {name:"aluminium", url: "./img/aluminum.jpg", index:4},
        {name:"litium", url: "./img/battery.jpg", index:5},
        {name:"svovel", url: "./img/onion.jpg", index:6},
        {name:"karbon", url: "./img/diamond.jpg", index:7},
        {name:"kalsium", url: "./img/kalsium.jpg", index:8},
    ];



    $scope.onInitialize=function(){
        $scope.nextElement = urlAndArray[urlAndArray.length-1];
        $scope.buttons[$scope.nextElement.index].correct=true;
    }

    $scope.submitAnswer=function(answer){

        var isCorrect = answer.correct;

        showPopup(isCorrect, answer);

        if(isCorrect){
            $scope.nextElement.correct=false;
            urlAndArray.pop();
            
        }

        else{
            var oldElement =  urlAndArray.pop();
            urlAndArray.unshift(oldElement);
             $scope.buttons[answer.index].correct=false;
        }
    }
    function initNextElement(){
        $scope.nextElement = urlAndArray[urlAndArray.length-1];
        $scope.buttons[$scope.nextElement.index].correct=true;
    }



    // function checkCorrect(answer){
    //     if(answer.correct){
    //         return(true);
    //     }
    //     else{
    //         return (false);
    //     }
    // }

    function winning(){
        $rootScope.winGame("periodic");
    }

    function showPopup(isCorrect, answer)  {
        $scope.data = {};

        var description = $scope.buttons[answer.index].description;
        console.log(description);


        if(isCorrect==true){
            var pop = {
                title: "RIKTIG!", 
                subTitle:"Du svarte " + $scope.buttons[answer.index].name + ". \n" + $scope.translations[description] ,
                //    $scope.buttons[answer.index].description,
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
                subTitle:"Du svarte " + $scope.buttons[answer.index].name + ". \n" + $scope.buttons[answer.index].description,
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


