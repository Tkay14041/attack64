"use strict";

const scoreBoard = new Array(10);
scoreBoard[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

scoreBoard[1] = [0,        100,  0, 10,  3,  3, 10,  0, 100,        0];
scoreBoard[2] = [0,          0,  0, 10,  2,  2, 10,  0,   0,        0];
scoreBoard[3] = [0,         10, 10, 20,  5,  5, 20, 10,  10,        0];
scoreBoard[4] = [0,          3,  2,  5, 50, 50,  5,  2,   3,        0];
scoreBoard[5] = [0,          3,  2,  5, 50, 50,  5,  2,   3,        0];
scoreBoard[6] = [0,         10, 10, 20,  5,  5, 20, 10,  10,        0];
scoreBoard[7] = [0,          0,  0, 10,  2,  2, 10,  0,   0,        0];
scoreBoard[8] = [0,        100,  0, 10,  3,  3, 10,  0, 100,        0];

scoreBoard[9] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// // test fucking board
// let scoreBoard = new Array(10);
// scoreBoard[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// scoreBoard[1] = [0,        100,  0, 10,  3,  3, 10,  0, 100,        0];
// scoreBoard[2] = [0,          0,  0, 10,  2043,  21345, 104531,  1534,   0,        0];
// scoreBoard[3] = [0,         10, 10, 205342,  5,  5, 20, 10,  10,        0];
// scoreBoard[4] = [0,          3,  2,  51324, 50, 50,  5,  2,   3,        0];
// scoreBoard[5] = [0,          3,  2,  5523454325, 50, 50,  5,  2,   3,        0];
// scoreBoard[6] = [0,         10, 10, 20,  5,  5, 20, 10,  10,        0];
// scoreBoard[7] = [0,          0,  0, 10,  215435,  24352435, 10523452,  0,   0,        0];
// scoreBoard[8] = [0,        100,  0, 10,  3,  3, 10,  0, 100,        0];

// scoreBoard[9] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


var CPU = CPU || {
    play: function(ctx) {
        var cpuPotentialCells = Othello.getPotentialCells();
        if (!cpuPotentialCells.length) return;
        // var cpuIdx = Math.floor(Math.random() * cpuPotentialCells.length);
        var cpuCell = [];
        var max = 0;
        console.log(cpuPotentialCells);
        for (let cell of cpuPotentialCells) {
            let score = scoreBoard[cell[1]][cell[0]];
            console.log(score);
            if (max <= score) {
                max = score;
                cpuCell[0] = cell[0];
                cpuCell[1] = cell[1];
            }
        }
        Othello.flipStones(cpuCell[0], cpuCell[1]);
        Common.changeTurn();
        Common.drawStones(ctx);
    },

    execCPU: function(ctx, turnText, blackCount, whiteCount, canvas, attackBtn) {
        CPU.play(ctx);
        Common.setText(turnText, blackCount, whiteCount);
        Othello.checkGameOver(canvas, attackBtn);
        Attack.checkHalfOccupied();
    }
}