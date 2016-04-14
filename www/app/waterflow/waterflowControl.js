angular.module('app.waterflow')
.controller('waterflowControl', function($scope, $stateParams) {
    var directions = {up:0, right:1, down:2, left:3};
    
    var tubeVariants = [];
    var UpDownTube = {
        src: "img/tubeUpDown.png",
        inputDirection: directions.up,
        outputDirection: directions.down,
    };
    var UpRightTube= {
        src: "img/tubeUpRight.png",
        inputDirection: directions.up,
        outputDirection: directions.right,
    };
    var UpLeftTube= {
        src: "img/tubeUpLeft.png",
        inputDirection: directions.up,
        outputDirection: directions.left,
    };

    var startTube = {
        src: "img/tube.jpg",
        outputDirection: directions.down,
    }
    var endTube = {
        src: "img/tube.jpg",
        inputDirection: directions.up,
    }
    tubeVariants.push(UpDownTube, UpRightTube, UpLeftTube);
    
    //triggered by ng-click on image. Takes an image object
    $scope.rotateImage = function(image){                              
        image["rotation"] = (image["rotation"]+90)% 360;
        image["outputDirection"] = (image["outputDirection"]+1)%4;
        image["inputDirection"] = (image["inputDirection"]+1)%4;
        image.classname="rot"+(image["rotation"]);
    };

    //Triggered by ng-click on test flow button.
    $scope.testFlow = function(){
        var start= $scope.images[0][0];
        for(var i = 0; i < columnCount; i++){
            for(var j = 0; j < rowCount; j++){
                //connectedDirection represents the objects that so far are connected to start. We need this for all elements.
                $scope.images[j][i]["connectedDirection"] = (j == 0 && i == 0) ? 0 : -1;
            }
        }

        var iterationCount = 0;
        var currentElement = start;
        while(currentElement != false){

            //return true when arriving to destination
            if(currentElement["src"] === "img/tube.jpg" && currentElement != start && currentElement != false){
                console.log("true");
                return true;
            }

            //get next element. The function nextElement will return false if there is no such thing
            currentElement = nextElement(currentElement);
            //insert animation logic on currentElement here


            //Infinate loop check was used for testing.
            iterationCount+=1;
            if(iterationCount > 100){
                console.log("infinate loop reached");
                return false;
            }
        }
        //The tube path does not lead to end node.
        console.log("While loop exited nextElement returned false");
        return false;
    };
    function nextElement(image){
        //log current image
        console.log(image);
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
            console.log("Element is undefined, probbly because it was outside the boundaries of the array");
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
    };
    opposite = function(int){
        return int >= 2 ? int-2 : int+2;
    }
    var rowCount = 5;
    var columnCount = 5;
    $scope.images = []; 
    $scope.loadImages = function() {
        for(var i = 0; i < columnCount; i++) {
            $scope.images.push([]);
            for(var j = 0; j<rowCount; j++){
                if(i == 0 && j == 0){
                    $scope.images[i].push({idX: i, idY:j, rotation: 0, src:startTube.src, inputDirection: 0, outputDirection:startTube.outputDirection, connectedDirection:0,});
                }else if(i == 4 && j == 4){
                    $scope.images[i].push({idX: i, idY:j, rotation: 0, src:endTube.src, outputDirection: 3, inputDirection:endTube.inputDirection, connectedDirection:-1,});
                }
                else{
                    var currentTube = pickRandomObjectProperty(tubeVariants);    
                    $scope.images[i].push({
                    idX: j, 
                    idY: i, 
                    rotation: 0, 
                    src: currentTube.src, 
                    inputDirection: currentTube.inputDirection, 
                    outputDirection: currentTube.outputDirection,
                    connectedDirection:-1,
                    });
                }
            }
        }
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

