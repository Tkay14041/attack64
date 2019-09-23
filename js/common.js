"use strict";

var Common = Common || {

    changeTurn: function() {
        var oppositeColor = 3 - colorOfTurn;
        colorOfTurn = oppositeColor;
    },

    // fix the coordinate to make the left top point of canvas the origin
    fixCoordinate: function(canvas){
        var rect = canvas.getBoundingClientRect();
        mouseX = mouseX - rect.left;
        mouseY = mouseY - rect.top;
    
        if (mouseX < 0 || 640 < mouseX) {
            return;
        } else if (mouseY < 0 || 640 < mouseY) {
            return;
        }
    
        inx = Math.floor(mouseX / 80) + 1;
        iny = Math.floor(mouseY / 80) + 1;
    },

    countStones: function() {
        var emptyCount = 0;
        var blackCount = 0;
        var whiteCount = 0;
    
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                switch (point[i][j]) {
                    case 0:
                        emptyCount++;
                        break;
                    case 1:
                        blackCount++;
                        break;
                    case 2:
                        whiteCount++;
                        break;
                }
            }
        }
    
        var stones = {'empty':emptyCount, 'black':blackCount, 'white':whiteCount};
        return stones;
    },
}