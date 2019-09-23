"use strict";

var Attack = Attack || {

    checkHalfOccupied: function() {
        if (Common.countStones()['empty'] == 68) {
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
        Attack.deleteStone(ctx, inx, iny);
    
        canvas.removeEventListener('click', attackEvent, {once:false});
        Common.changeTurn();
        canvas.addEventListener('click', canvasEvent, {once:false});
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