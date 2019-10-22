"use strict";

var Attack = Attack || {

    checkHalfOccupied: function() {
        if (Common.countStones()['empty'] == 90) {
            isHalfOccupied = true;
        } 
    },

    execAttack: async function(ctx, inx, iny, turnText, blackCount, whiteCount, canvas, attackBtn) {
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