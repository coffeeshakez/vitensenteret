angular.module('app.waterflow')
.controller('waterflowControl', function($scope, $rootScope, $ionicPopup, $window) {
    var directions = {up:0, right:1, down:2, left:3};    
    var tubeVariants = [];
    var UpDownTube = {
        id:0,
        src: "img/tubeUpDown.png",
        inputDirection: directions.up,
        outputDirection: directions.down,
        spriteCount: 3,
    };
    var UpRightTube= {
        id:1,
        src: "img/tubeUpRight.png",
        inputDirection: directions.up,
        outputDirection: directions.right,
        spriteCount: 1,
    };
    var UpLeftTube= {
        id:2,
        src: "img/tubeUpLeft.png",
        inputDirection: directions.up,
        outputDirection: directions.left,
        spriteCount: 1,
    };

    var startTube = {
        id:3,
        src: "img/rsz_tube_start.png",
        outputDirection: directions.down,
        spriteCount: 1,
    }
    var endTube = {
        id:4,
        src: "img/rsz_tube_end.png",
        inputDirection: directions.up,
        spriteCount: 1,
    }


    /*
        Set createNewBoards to true to create randomized boards. This is useful as the copy-paste date will be shown with console.log
        The copy-paste data can then be pasted directly into the loadLevelOne, loadLevelTwo and loadLevelThree functions 
    */
    var createNewBoards = false;
    //remove start and endtube if you want randomized map //, startTube, endTube
    tubeVariants.push(UpDownTube, UpRightTube, UpLeftTube, startTube, endTube);

    //triggered by ng-click on image. Takes an image object
    $scope.rotateImage = function(image){
        if(image["src"] === endTube.src || image["src"] === startTube.src){
            return;
        }                              
        image["rotation"] = (image["rotation"]+90)% 360;
        image["outputDirection"] = (image["outputDirection"]+1)%4;
        image["inputDirection"] = (image["inputDirection"]+1)%4;
        image.classname="rot"+(image["rotation"]);
    };

    var rand;
    setRotation = function(image){
        if(image["src"] === endTube.src || image["src"] === startTube.src){
            return;
        }
        rand = Math.floor((Math.random() * 4));
        image["rotation"] = (image["rotation"]+rand*90)% 360;
        image["outputDirection"] = (image["outputDirection"]+rand)%4;
        image["inputDirection"] = (image["inputDirection"]+rand)%4;
        image.classname="rot"+(image["rotation"]);
    }

    function reset(){
        $scope.images = [];
        $scope.loadImages();
    }


    var numberOfWins = 0;
    function showPopup(result) {
        $scope.data = {};

        // An elaborate, custom popup
        if(result === true){
            numberOfWins+=1;


            //TODO: Add proper text to popups
            if(numberOfWins >= 3){
                var myPopup = $ionicPopup.show({
                    title: $rootScope.trans.WATER_CORRECT_PATH_TITLE,
                    subTitle: $rootScope.trans.WATER_COMPLETED_DESC,
                    scope: $scope,
                    buttons: [
                        {   text: $rootScope.trans.WATER_COMPLETED_NEXT,
                            type: 'button-positive',
                            onTap: function(e) {
                                numberOfWins = 0;
                                reset();
                                $rootScope.winGame("waterflow");
                                return;
                            }
                        }
                    ]
                });
            }
            else{
                var myPopup = $ionicPopup.show({
                    title: $rootScope.trans.WATER_CORRECT_PATH_TITLE,
                    subTitle: $rootScope.trans.WATER_CORRECT_PATH_DESC,
                    scope: $scope,
                    buttons: [
                        {   text: $rootScope.trans.WATER_NEXT_LEVEL,
                            type: 'button-positive',
                            onTap: function(e){
                                reset();
                            }
                        },
                    ]
                });
            }


        }else{
            var myPopup = $ionicPopup.show({
                title: createNewBoards ? "Copy-paste is in the console log":$rootScope.trans.WATER_INCORRECT_PATH_TITLE,
                subTitle:  createNewBoards ? "Generer nytt board": $rootScope.trans.WATER_INCORRECT_PATH_DESC,
                scope: $scope,
                buttons: [
                    {   text: 'Ok', 
                        type: 'button-positive',
                        onTap: function(e) {
                            if(createNewBoards)
                                reset();
                        }
                    },
                ]
            });
        }  

        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
    };

    var animationInterval = null;
    var animationQue = []; 
    $scope.testFlow = function(){
        var start= $scope.images[0][0];
        console.log("running testFlow");
        for(var i = 0; i < columnCount; i++){
            for(var j = 0; j < rowCount; j++){
                //connectedDirection represents the objects that so far are connected to start. We need this for all elements.
                $scope.images[j][i]["connectedDirection"] = (j == 0 && i == 0) ? 0 : -1;
            }
        }

        var iterationCount = 0;
        var currentElement = start;
        var result = false;
        while(currentElement != false){
            //return true when arriving to destination
            if(currentElement["src"] === endTube.src && currentElement != start && currentElement != false){
                console.log("true");
                result = true;
                showPopup(result);
                return result;
            }
            //get next element. The function nextElement will return false if there is no such thing
            else{
                currentElement = nextElement(currentElement);
            }
        }
        showPopup(result);
        return result;
    }

  

    $scope.levelNumerator = ""+(numberOfWins+1) + "/3";
    function changeLevelNumerator(){
        $scope.levelNumerator = ""+(numberOfWins+1) + "/3";
    }



    function nextElement(image){
        console.log(image);
        //log current image
        //Its not that intuitive to use image["outputDirection"] and image["inputDirection"],
        //because the names do not represent the real output and input directions, and the difference between the two is not relevant to the code logic. 
        //The following line sets the real outputDirection to the direction that is not already connected to the flow-path (either image["inputDirection"] or image["outputDirection"]).
        var outputDirection = image["connectedDirection"] == image["outputDirection"] ? image["inputDirection"] : image["outputDirection"];
        var next = image;
        //Set next element to where (real) outputDirection is pointing to.
        try{
            if (outputDirection === directions.down){
                next = $scope.images[image["idY"]+1][image["idX"]];
            }else if (outputDirection == directions.up){
                next = $scope.images[image["idY"]-1][image["idX"]];
            }else if (outputDirection == directions.right){
                next = $scope.images[image["idY"]][image["idX"]+1];
            }else if (outputDirection == directions.left){
                next = $scope.images[image["idY"]][image["idX"]-1];
            }
            //Returnes false if error in selecting next element. Instead of cathing an error it usually just sets the next object to undefined.
        }catch(error){
            console.log("Error in selecting the next element");
            return false;
        }
        //test if next element is undefined to avoid error in following code. 
        if(next === undefined){
            console.log("Element is undefined, probably because it was outside the boundaries of the array");
            return false;
        }
        //The element is pointing to something that is wrongly turned
        if(!(next["outputDirection"] == opposite(outputDirection) || next["inputDirection"] == opposite(outputDirection))){
            console.log("An element is turned incorrectly");
            return false;
        }
        //Wont be triggered, but was used in development. Maybe it will be useful again some day
        if(next["connectedDirection"] >= 0){
            console.log("An element is trying to connect to an already connected element()");
            return false;
        }
        //set the connectedDirection so that the nextElement is connected to the path.
        next["connectedDirection"] = opposite(outputDirection);
        return next;
    }

    opposite = function(int){
        return int >= 2 ? int-2 : int+2;
    }
    var rowCount = 5;
    var columnCount = 5;
    $scope.images = []; 
    $scope.loadImages = function() {
        if(createNewBoards){
            //makes the tubeVariants array again, to avoid start and endtubes randomly placed on board
            tubeVariants = [];
            tubeVariants.push(UpDownTube, UpRightTube, UpLeftTube);
        //creates randomized board
            for(var i = 0; i < columnCount; i++) {  
                $scope.images.push([]);
                for(var j = 0; j<rowCount; j++){
                    if(i == 0 && j == 0){
                        loader({tubeID: startTube.id, idX: i, idY:j, rotation: 0, src:startTube.src, inputDirection: 0, outputDirection:startTube.outputDirection, connectedDirection:0,});
                    }else if(i == 4 && j == 4){
                        loader({tubeID: endTube.id, idX: i, idY:j, rotation: 0, src:endTube.src, outputDirection: 3, inputDirection:endTube.inputDirection, connectedDirection:-1,});
                    }
                    else{
                        var currentTube = pickRandomObjectProperty(tubeVariants);    
                        loader({
                        tubeID: currentTube.id,
                        idX: j, 
                        idY: i, 
                        rotation: 0, 
                        src: currentTube.src, 
                        inputDirection: currentTube.inputDirection, 
                        outputDirection: currentTube.outputDirection,
                        connectedDirection:-1,
                        animationStep: 0,
                        spriteCount: currentTube.spriteCount,
                        });
                    }
                }
             }
         }

        if(!createNewBoards){
            for(var i = 0; i < columnCount; i++) {
                 $scope.images.push([]);
            }

            if(numberOfWins === 0){
               loadLevelOne();
            }
            else if(numberOfWins === 1){
               loadLevelTwo();
            }
            else if(numberOfWins === 2){
               loadLevelThree();
            }
        }
      // // prints code for board
        if(createNewBoards){
            for(var i = 0; i < columnCount; i++) {
                for(var j = 0; j<rowCount; j++){
                    console.log(
                    "loader({tubeID: "+ $scope.images[i][j]["tubeID"]+ ","+
                    "idX: "+ $scope.images[i][j]["idX"]+","+
                    "idY: "+ $scope.images[i][j]["idY"]+","+
                    "rotation: "+ $scope.images[i][j]["rotation"]+","+
                    "src: "+ $scope.images[i][j]["src"]+","+
                    "inputDirection: "+ $scope.images[i][j]["inputDirection"]+","+
                    "outputDirection: "+ $scope.images[i][j]["outputDirection"]+","+
                    "connectedDirection: "+ $scope.images[i][j]["connectedDirection"]+","+
                    "animationStep: "+ $scope.images[i][j]["animationStep"]+","+
                    "spriteCount: "+ $scope.images[i][j]["spriteCount"]+","+
                    "});"
                    );
                }
            }
        }
    }

    function loadLevelOne(){
        changeLevelNumerator();
        loader({tubeID: 3,idX: 0,idY: 0,rotation: 0,src: "img/tube_start.png",inputDirection: 0,outputDirection: 2,connectedDirection: 0,animationStep: undefined,spriteCount: undefined,});
        loader({tubeID: 0,idX: 1,idY: 0,rotation: 0,src: "img/tubeUpDown.png", inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 1,idX: 2,idY: 0,rotation: 0,src: "img/tubeUpRight.png" ,inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 0,idX: 3,idY: 0,rotation: 0,src: "img/tubeUpDown.png", inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 1,idX: 4,idY: 0,rotation: 0,src: "img/tubeUpRight.png" ,inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 1,idX: 0,idY: 1,rotation: 0,src: "img/tubeUpRight.png ",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 2,idX: 1,idY: 1,rotation: 0,src: "img/tubeUpLeft.png" ,inputDirection: 0,outputDirection: 3,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 1,idX: 2,idY: 1,rotation: 0,src: "img/tubeUpRight.png" ,inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 2,idX: 3,idY: 1,rotation: 0,src: "img/tubeUpLeft.png" ,inputDirection: 0,outputDirection: 3,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 2,idX: 4,idY: 1,rotation: 0,src: "img/tubeUpLeft.png" ,inputDirection: 0,outputDirection: 3,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 1,idX: 0,idY: 2,rotation: 0,src: "img/tubeUpRight.png" ,inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 0,idX: 1,idY: 2,rotation: 0,src: "img/tubeUpDown.png" ,inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 1,idX: 2,idY: 2,rotation: 0,src: "img/tubeUpRight.png" ,inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 2,idX: 3,idY: 2,rotation: 0,src: "img/tubeUpLeft.png" ,inputDirection: 0,outputDirection: 3,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 0,idX: 4,idY: 2,rotation: 0,src: "img/tubeUpDown.png" ,inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 1,idX: 0,idY: 3,rotation: 0,src: "img/tubeUpRight.png" ,inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 2,idX: 1,idY: 3,rotation: 0,src: "img/tubeUpLeft.png" ,inputDirection: 0,outputDirection: 3,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 1,idX: 2,idY: 3,rotation: 0,src: "img/tubeUpRight.png" ,inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 0,idX: 3,idY: 3,rotation: 0,src: "img/tubeUpDown.png" ,inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 0,idX: 4,idY: 3,rotation: 0,src: "img/tubeUpDown.png" ,inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 0,idX: 0,idY: 4,rotation: 0,src: "img/tubeUpDown.png" ,inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 1,idX: 1,idY: 4,rotation: 0,src: "img/tubeUpRight.png" ,inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 2,idX: 2,idY: 4,rotation: 0,src: "img/tubeUpLeft.png" ,inputDirection: 0,outputDirection: 3,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 1,idX: 3,idY: 4,rotation: 0,src: "img/tubeUpRight.png" ,inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 4,idX: 4,idY: 4,rotation: 0,src: "img/tube_end.jpg" ,inputDirection: 0,outputDirection: 3,connectedDirection: -1,animationStep: undefined,spriteCount: undefined,});
    }
    function loadLevelTwo(){
        changeLevelNumerator();
        loader({tubeID: 3,idX: 0,idY: 0,rotation: 0,src: "img/tube_start.png",inputDirection: 0,outputDirection: 2,connectedDirection: 0,animationStep: undefined,spriteCount: undefined,});
        loader({tubeID: 1,idX: 1,idY: 0,rotation: 0,src: "img/tubeUpRight.png",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 0,idX: 2,idY: 0,rotation: 0,src: "img/tubeUpDown.png",inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 2,idX: 3,idY: 0,rotation: 0,src: "img/tubeUpLeft.png",inputDirection: 0,outputDirection: 3,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 1,idX: 4,idY: 0,rotation: 0,src: "img/tubeUpRight.png",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 0,idX: 0,idY: 1,rotation: 0,src: "img/tubeUpDown.png",inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 2,idX: 1,idY: 1,rotation: 0,src: "img/tubeUpLeft.png",inputDirection: 0,outputDirection: 3,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 2,idX: 2,idY: 1,rotation: 0,src: "img/tubeUpLeft.png",inputDirection: 0,outputDirection: 3,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 0,idX: 3,idY: 1,rotation: 0,src: "img/tubeUpDown.png",inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 2,idX: 4,idY: 1,rotation: 0,src: "img/tubeUpLeft.png",inputDirection: 0,outputDirection: 3,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 0,idX: 0,idY: 2,rotation: 0,src: "img/tubeUpDown.png",inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 0,idX: 1,idY: 2,rotation: 0,src: "img/tubeUpDown.png",inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 2,idX: 2,idY: 2,rotation: 0,src: "img/tubeUpLeft.png",inputDirection: 0,outputDirection: 3,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 0,idX: 3,idY: 2,rotation: 0,src: "img/tubeUpDown.png",inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 1,idX: 4,idY: 2,rotation: 0,src: "img/tubeUpRight.png",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 1,idX: 0,idY: 3,rotation: 0,src: "img/tubeUpRight.png",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 1,idX: 1,idY: 3,rotation: 0,src: "img/tubeUpRight.png",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 1,idX: 2,idY: 3,rotation: 0,src: "img/tubeUpRight.png",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 0,idX: 3,idY: 3,rotation: 0,src: "img/tubeUpDown.png",inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 1,idX: 4,idY: 3,rotation: 0,src: "img/tubeUpRight.png",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 1,idX: 0,idY: 4,rotation: 0,src: "img/tubeUpRight.png",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 1,idX: 1,idY: 4,rotation: 0,src: "img/tubeUpRight.png",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 1,idX: 2,idY: 4,rotation: 0,src: "img/tubeUpRight.png",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 0,idX: 3,idY: 4,rotation: 0,src: "img/tubeUpDown.png",inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 4,idX: 4,idY: 4,rotation: 0,src: "img/tube_end.jpg" ,inputDirection: 0,outputDirection: 3,connectedDirection: -1,animationStep: undefined,spriteCount: undefined,});
    }
    function loadLevelThree(){

        loader({tubeID: 3,idX: 0,idY: 0,rotation: 0,src: "img/tube_start.png",inputDirection: 0,outputDirection: 2,connectedDirection: 0,animationStep: undefined,spriteCount: undefined,});
        loader({tubeID: 1,idX: 1,idY: 0,rotation: 0,src: "img/tubeUpRight.png",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 0,idX: 2,idY: 0,rotation: 0,src: "img/tubeUpDown.png",inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 1,idX: 3,idY: 0,rotation: 0,src: "img/tubeUpRight.png",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 1,idX: 4,idY: 0,rotation: 0,src: "img/tubeUpRight.png",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 0,idX: 0,idY: 1,rotation: 0,src: "img/tubeUpDown.png",inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 2,idX: 1,idY: 1,rotation: 0,src: "img/tubeUpLeft.png",inputDirection: 0,outputDirection: 3,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 2,idX: 2,idY: 1,rotation: 0,src: "img/tubeUpLeft.png",inputDirection: 0,outputDirection: 3,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 0,idX: 3,idY: 1,rotation: 0,src: "img/tubeUpDown.png",inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 0,idX: 4,idY: 1,rotation: 0,src: "img/tubeUpDown.png",inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 1,idX: 0,idY: 2,rotation: 0,src: "img/tubeUpRight.png",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 2,idX: 1,idY: 2,rotation: 0,src: "img/tubeUpLeft.png",inputDirection: 0,outputDirection: 3,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 2,idX: 2,idY: 2,rotation: 0,src: "img/tubeUpLeft.png",inputDirection: 0,outputDirection: 3,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 1,idX: 3,idY: 2,rotation: 0,src: "img/tubeUpRight.png",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 0,idX: 4,idY: 2,rotation: 0,src: "img/tubeUpDown.png",inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 0,idX: 0,idY: 3,rotation: 0,src: "img/tubeUpDown.png",inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 1,idX: 1,idY: 3,rotation: 0,src: "img/tubeUpRight.png",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 1,idX: 2,idY: 3,rotation: 0,src: "img/tubeUpRight.png",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 1,idX: 3,idY: 3,rotation: 0,src: "img/tubeUpRight.png",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 0,idX: 4,idY: 3,rotation: 0,src: "img/tubeUpDown.png",inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 0,idX: 0,idY: 4,rotation: 0,src: "img/tubeUpDown.png",inputDirection: 0,outputDirection: 2,connectedDirection: -1,animationStep: 0,spriteCount: 3,});
        loader({tubeID: 2,idX: 1,idY: 4,rotation: 0,src: "img/tubeUpLeft.png",inputDirection: 0,outputDirection: 3,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 1,idX: 2,idY: 4,rotation: 0,src: "img/tubeUpRight.png",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 1,idX: 3,idY: 4,rotation: 0,src: "img/tubeUpRight.png",inputDirection: 0,outputDirection: 1,connectedDirection: -1,animationStep: 0,spriteCount: 1,});
        loader({tubeID: 4,idX: 4,idY: 4,rotation: 0,src: "img/tube_end.jpg",inputDirection: 0,outputDirection: 3,connectedDirection: -1,animationStep: undefined, spriteCount: undefined,});
        changeLevelNumerator();
    }
    function loader (element){
        if(element["src"] !== startTube.src && element["src"] !== endTube.src){
            element["src"] = tubeVariants[element["tubeID"]].src;
            setRotation(element);
        }
        $scope.images[element["idY"]].push(element);
    }
    function pickRandomObjectProperty(obj){
        var result;
        var count = 0;
        for (var i in obj){
            if (Math.random() < 1/++count){
                result = i;
            }
        }
        return obj[result];
    }
});


