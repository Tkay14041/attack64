"use strict";

var Attack = Attack || {

    checkHalfOccupied: function() {
        if (Common.countStones()['empty'] == 90) {
            isHalfOccupied = true;
        } 
    },

    execAttack: function(ctx, inx, iny) {
        if (point[inx][iny] == 0) return;
        
        if (colorOfTurn == 1) {
            attackBlack = false;
        } else if (colorOfTurn == 2) {
            attackWhite = false;
        }

        point[inx][iny] = 0;
        Common.deleteStone(ctx, inx, iny);
    }
}