"use strict";

var Common = Common || {

    setTrunText: function(turnText) {
        var color;
        if (colorOfTurn == 1) {
            color = "黒";
        } else {
            color = "白";
        }
        turnText.textContent = color + "のターンです";
    },

    showStoneCount: function(blackCount, whiteCount) {
        blackCount.textContent = Common.countStones()['black'];
        whiteCount.textContent = Common.countStones()['white'];
    },
    
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

    // draw stones on the board
    drawStones: function(ctx){
        for (var i = 1; i < 10; i++) {
            for (var j = 1; j < 10; j++) {
                var color = '';
                if (point[i][j] == 1) {
                    color = 'black';
                } else if (point[i][j] == 2) {
                    color = 'white';
                }
                Common.displayStone(ctx, i, j, color);
            }
        }
    },

    displayStone: function(ctx, inx, iny, color){
        if (color != 'black' && color != 'white') return;
        Common.deleteStone(ctx,inx, iny);
        ctx.beginPath();
        var centerX = 40 + (inx - 1) * 80;
        var centerY = 40 + (iny - 1) * 80;
        var radius = 35;
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.fill();
    },

    deleteStone: function(ctx, inx, iny) {
        ctx.beginPath();
        var startX = (inx - 1) * 80 + 1;
        var startY = (iny - 1) * 80 + 1;
        var side = 78;
        ctx.rect(startX, startY, side, side);
        ctx.strokeStyle = '#006600';
        ctx.fillStyle = '#006600';
        ctx.fill();
    }
}