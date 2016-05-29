angular.module('app.overview')
.controller('OverviewCtrl', function($scope, $rootScope, $state, $stateParams, localStorageService, $ionicPopup, $interval, $timeout) {

    //Function which runs every time view is changed to
    $scope.$on('$ionicView.enter', function() {
        $rootScope.backButton = false;
    });
        
    //Setting interval for updating the beacon list
    var signalInterval;

    //Maps beacon names to respective game. Is used to start games when beacon signal is in range.
    var beaconMap = {"nRF5-Eddy" : "waterflow" };
    var beacons = {};
    $rootScope.beaconsActive = false;


    //run when a minigame has been won. Will set the corresponding part as collected and go to the reward view.
    $rootScope.winGame = function(game){
        var wonGame = $rootScope.minigames[game];
        $rootScope.parts[wonGame.part].collected = true;

        wonGame.collected = true;
        $state.go("index.reward", {"game": wonGame.name, "part": wonGame.part});
        return true;
    }

    //helper function for counting how many minigames have been won
    $scope.collectedMinigamesCount = function(){
        var count = 0;
        angular.forEach($scope.minigames, function(minigame){
            count += minigame.collected ? 1 : 0;
        });
        return count; 
    }
    
    //helper function for generating style classes for minigame boxes
    $scope.minigameClasses = function(minigame){
        var collected = minigame.collected ? 'part-collected' : 'part-not-collected';
        var icon = minigame.collected || !$rootScope.beaconsActive  || minigame.found ? minigame.icon : "ion-help";
        return icon + " " + collected;
    }
    
    //run when user clicks a minigame box.
    $scope.minigameStart = function(minigame){
        if(!minigame.collected){
            var popup = gamePopup(minigame);
            var myPopup = $ionicPopup.show(popup);
            stopScan();
        }
        else{
            var popup = noGamePopup(minigame);
            $ionicPopup.show(popup);
        }
    }
    
    //debug function for setting minigame as won/not won
    $scope.minigameToggle = function(minigame){
        minigame.collected ^= true;
    }

    //generates a start game popup variable
    function gamePopup(minigame) {

      return {
        title: $rootScope.trans[minigame.name],
        subTitle: $rootScope.trans[minigame.story],
        scope: $scope,
        buttons: [
          {
            text: $rootScope.trans["OVERVIEW_POPUP_CANCEL_BUTTON"],
            type: 'button-assertive',
            onTap: function (e) {
                return false;
            }
          },
          {
            text: $rootScope.trans["OVERVIEW_POPUP_START_BUTTON"],
            type: 'button-positive',
            onTap: function (e) {
                $rootScope.backButton = true;
                $state.go("index."+minigame.game);

            }
          },
        ]
      };
    }

    //generates a "already won game" popup variable
    function noGamePopup(minigame) {

      return {
        title: $rootScope.trans[minigame.name],
        subTitle: $rootScope.trans["OVERVIEW_ALREADY_WON"],
        scope: $scope,
        buttons: [
          {
            text: $rootScope.trans["OVERVIEW_POPUP_CANCEL_BUTTON"],
            type: 'button-assertive',
            onTap: function (e) {
                return false;
            }
          }
        ]
      };
    }

    //BEGIN BEACON FUNCTIONALITY. Many of the functions override/redefine default Eddystone framework functions. 

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
        //if evothings is not defined, one is probably in the browser.
        if(typeof evothings === 'undefined' || evothings === null){
            console.log("No cordova. Dev-mode.")
            $rootScope.devMode = true;
            return false;
        }
        console.log("scan in progress..")
        evothings.eddystone.startScan(
            function(beacon)
            {
                $rootScope.beaconsActive = true;
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
                $rootScope.minigames[miniGameName].found = true;
            },
            function(error)
            {
                console.log("eddystone scan error: " + error);
                $rootScope.beaconsActive = false;
            });
    }

    function stopScan()
    {
        console.log("Scanning stops..") 
        if(typeof evothings === 'undefined' || evothings === null){
            console.log("No cordova. Dev-mode.")
            return false;
        }
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

    onDeviceReady();

});
