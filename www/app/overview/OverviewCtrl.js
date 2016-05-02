angular.module('app.overview')
.controller('OverviewCtrl', function($scope, $rootScope, $state, $stateParams, localStorageService, $ionicPopup, $translate, $interval, $timeout) {


    var minigamesLocal = localStorageService.get('minigames');
    var partsLocal = localStorageService.get('parts');
    var languageLocal = localStorageService.get('language');

    //Used for storing beacons that are in range
    var beacons = {};

    //Setting interval for updating the beacon list
    var signalInterval;

    if(!languageLocal){
        $state.go("index.chooseLanguage");
    }else{
        $rootScope.language = languageLocal;
        console.log("Stored language is: "+$rootScope.language);
    }

    $translate.preferredLanguage($rootScope.language);
    $translate.use($rootScope.language);

    $translate(["OVERVIEW_QUIZ_BUTTON",
    "OVERVIEW_ELEMENTS_BUTTON",
    "OVERVIEW_COLOR_BUTTON",
    "OVERVIEW_MELODY_BUTTON",
    "OVERVIEW_WATER_BUTTON",
    "OVERVIEW_SIMON_SAYS_BUTTON",
    "OVERVIEW_SHORTEST_PATH_BUTTON",
    "OVERVIEW_POPUP_START_BUTTON",
    "OVERVIEW_POPUP_CANCEL_BUTTON",
    "QUIZ_INTRO_POPUP",
    "ELEMENTS_INTRO_POPUP",
    "COLOR_INTRO_POPUP",
    "MELODY_INTRO_POPUP",
    "WATER_INTRO_POPUP",
    "SIMON_SAYS_INTRO_POPUP",
    "SHORTEST_PATH_INTRO_POPUP"]).then(function(translations){
        $scope.translations = translations;
    });
    
    $scope.$watch('minigames', function () {
      localStorageService.set('minigames', $scope.minigames);
    }, true);

    $scope.$watch('parts', function () {
      localStorageService.set('parts', $scope.parts);
    }, true);


    $rootScope.minigames = minigamesLocal || {
        "quiz":      {name: "OVERVIEW_QUIZ_BUTTON",           game: "quiz",      icon: "ion-help",              part: "head",   collected: false, story: "QUIZ_INTRO_POPUP",            found: false },
        "periodic":  {name: "OVERVIEW_ELEMENTS_BUTTON",       game: "periodic",  icon: "ion-nuclear",           part: "body",   collected: false, story: "ELEMENTS_INTRO_POPUP",        found: false },
        "colors":    {name: "OVERVIEW_COLOR_BUTTON",          game: "colors",    icon: "ion-lock-combination",  part: "head",   collected: false, story: "COLOR_INTRO_POPUP",           found: false },
        "sound":     {name: "OVERVIEW_MELODY_BUTTON",         game: "sound",     icon: "ion-music-note",        part: "head",   collected: false, story: "MELODY_INTRO_POPUP",          found: false },
        "waterflow": {name: "OVERVIEW_WATER_BUTTON",          game: "waterflow", icon: "ion-waterdrop",         part: "arms",   collected: false, story: "WATER_INTRO_POPUP",           found: false },
        "memory":    {name: "OVERVIEW_SIMON_SAYS_BUTTON",     game: "memory",    icon: "ion-load-b",            part: "arms",   collected: false, story: "SIMON_SAYS_INTRO_POPUP",      found: false },
        "shortest":  {name: "OVERVIEW_SHORTEST_PATH_BUTTON",  game: "shortest",  icon: "ion-map",               part: "legs",   collected: false, story: "SHORTEST_PATH_INTRO_POPUP",   found: false },
        

    };

    $rootScope.parts = partsLocal || {
        "head": {name: "Hode",  desc: "et hode",  type: "head", variants: [1, 2, 3],      variant: 3, collected: false},
        "arms":  {name: "Armer", desc: "to armer", type: "arms", variants: [1, 2, 3],      variant: 1, collected: false},
        "legs":  {name: "Bein",  desc: "bein",     type: "legs", variants: [1, 2, 3, 4],   variant: 1, collected: false},
        "body": {name: "Overkropp", desc: "en overkropp", type: "body", variants: [1, 2], variant: 2, collected: false},
    };

    $rootScope.winGame = function(game){
        var wonGame = $rootScope.minigames[game];
        $rootScope.parts[wonGame.part].collected = true;

        wonGame.collected = true;
        $state.go("index.reward", {"game": wonGame.name, "part": wonGame.part});
        return true;
    }

    $rootScope.resetGame = function(){
        localStorageService.clearAll();
        console.log("Cleared local-storage");
        document.location = "index.html";
    }

    $scope.collectedMinigamesCount = function(){
        var count = 0;
        angular.forEach($scope.minigames, function(minigame){
            count += minigame.collected ? 1 : 0;
        });
        return count; 
    }
    
    $scope.minigameClasses = function(minigame){
        var collected = minigame.collected ? 'part-collected' : 'part-not-collected';
        var icon = minigame.icon;
        return icon + " " + collected;
    }

    $scope.minigameStart = function(minigame){
        var popup = gamePopup(minigame);
        var myPopup = $ionicPopup.show(popup);
        stopScan();
    }

    $scope.minigameToggle = function(minigame){
        minigame.collected ^= true;
    }

    function gamePopup(minigame) {

      return {
        title: $scope.translations[minigame.name],
        subTitle: $scope.translations[minigame.story],
        scope: $scope,
        buttons: [
          {
            text: '<b>Avbryt</b>',
            type: 'button-assertive',
            onTap: function (e) {
                return false;
            }
          },
          {
            text: '<b>Start!</b>',
            type: 'button-positive',
            onTap: function (e) {
                $state.go("index."+minigame.game);
            }
          },
        ]
      };
    }

    function onDeviceReady()
        {
            // Start tracking beacons!
            $timeout(function()
            {
                startScan();
            },
            500);

           
        }

    function startScan()
        {
            
            console.log("scan in progress..")
            evothings.eddystone.startScan(
                function(beacon)
                {

                    // Update beacon data.
                    beacon.timeStamp = Date.now();
                    beacons[beacon.address] = beacon;

                    console.log(beacon.name);
                    console.log(beacon.rssi);

                    // var beaconName = getBeaconName(beacon);
                    miniGameName = beaconMap[beacon.name];
                    console.log(miniGameName);
                    console.log($rootScope.minigames[miniGameName]);

                    $scope.minigameStart($rootScope.minigames[miniGameName]);

                      
                },
                function(error)
                {
                    console.log("eddystone scan error: " + error);
                    
                });
        }

    function stopScan()
    {
        console.log("Scanning stops..") 
        evothings.eddystone.stopScan();
    }

    function getBeaconName(beacon)
    {
        var name = beacon.name || 'no name';
        return name;
    }

    function getBeaconRSSI(beacon)
    {
        return beacon.rssi 
    }

    var beaconMap = {"nRF5-Eddy" : "waterflow" };


    //Start scanning for beacons when controller is started
    onDeviceReady();

});
