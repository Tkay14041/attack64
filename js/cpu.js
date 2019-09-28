"use strict";

var CPU = CPU || {
    play: function(ctx) {
        var cpuPotentialCells = Othello.getPotentialCells();
        if (!cpuPotentialCells.length) return;
        var cpuIdx = Math.floor(Math.random() * cpuPotentialCells.length);
        var cpuCell = cpuPotentialCells[cpuIdx];
        Othello.flipStones(cpuCell[0], cpuCell[1]);
        Common.drawStones(ctx);
    },

    execCPU: function(ctx, turnText, blackCount, whiteCount) {
        CPU.play(ctx);
        Common.setText(turnText, blackCount, whiteCount);
        Othello.checkGameOver();
        Attack.checkHalfOccupied();
        if (isHalfOccupied) {
            document.getElementById('button').disabled = false;
        }
  }
}