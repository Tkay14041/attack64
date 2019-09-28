"use strict";

var CPU = CPU || {
    play: function(ctx) {
        var cpuPotentialCells = Othello.getPotentialCells();
        var cpuIdx = Math.floor(Math.random() * cpuPotentialCells.length);
        var cpuCell = cpuPotentialCells[cpuIdx];
        Othello.flipStones(cpuCell[0], cpuCell[1]);
        Common.drawStones(ctx);
    }
}