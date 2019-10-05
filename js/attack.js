"use strict";

var Attack = Attack || {

    checkHalfOccupied: function() {
        if (Common.countStones()['empty'] == 90) {
            isHalfOccupied = true;
        } 
    },

    execAttack: function(ctx, inx, iny, turnText, blackCount, whiteCount, canvas, attackBtn) {
        if (point[inx][iny] == 0) return;
        
        if (colorOfTurn == 1) {
            attackBlack = false;
        } else if (colorOfTurn == 2) {
            attackWhite = false;
        }
    
        point[inx][iny] = 0;
        Common.deleteStone(ctx, inx, iny);
        canvas.removeEventListener('click', attackEvent, {once:false});

        Common.changeTurn();
        if(!Othello.checkPass()) {
            setTimeout(CPU.execCPU, 500, ctx, turnText, blackCount, whiteCount, canvas, attackBtn);
        } else {
            Common.changeTurn();
            Common.setText(turnText, blackCount, whiteCount);

            Othello.checkGameOver(canvas, attackBtn);
            Attack.checkHalfOccupied();
        }

        canvas.addEventListener('click', canvasEvent, {once:false});
    }
}