angular.module('app.overview')
.controller('OverviewCtrl', function($scope, $rootScope, $state, $stateParams, localStorageService, $ionicPopup, $interval, $timeout) {


    $scope.$on('$ionicView.enter', function() {
        //Runs every time view is changed to
        $rootScope.backButton = false;
    });
        //Used for storing beacons that are in range
    var beacons = {};

    //Setting interval for updating the beacon list
    var signalInterval;
    $rootScope.beaconsActive = false;

    $rootScope.winGame = function(game){
        var wonGame = $rootScope.minigames[game];
        $rootScope.parts[wonGame.part].collected = true;

        wonGame.collected = true;
        $state.go("index.reward", {"game": wonGame.name, "part": wonGame.part});
        return true;
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
        var icon = minigame.collected || !$rootScope.beaconsActive  || minigame.found ? minigame.icon : "ion-help";
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
        title: $rootScope.trans[minigame.name],
        subTitle: $rootScope.trans[minigame.story],
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
                $rootScope.backButton = true;
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
