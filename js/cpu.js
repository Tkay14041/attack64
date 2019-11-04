"use strict";

const scoreBoard = new Array(10);
scoreBoard[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

scoreBoard[1] = [0,        100,  0, 10,  3,  3, 10,  0, 100,        0];
scoreBoard[2] = [0,          0,  0, 10,  2,  2, 10,  0,   0,        0];
scoreBoard[3] = [0,         10, 10, 20,  5,  5, 20, 10,  10,        0];
scoreBoard[4] = [0,          3,  2,  5, 50, 50,  5,  2,  23,        0];
scoreBoard[5] = [0,          3,  2,  5, 50, 50,  5, 22,   3,        0];
scoreBoard[6] = [0,         10, 10, 20,  5,  5, 20, 10,  10,        0];
scoreBoard[7] = [0,          0,  0, 10,  2,  2, 10,  0,   0,        0];
scoreBoard[8] = [0,        100,  0, 10,  3,  3, 10,  0, 100,        0];

scoreBoard[9] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var CPU = CPU || {
    play: function(ctx) {
        var cpuPotentialCells = Othello.getPotentialCells();
        if (!cpuPotentialCells.length) return;
        var cpuCell = [];
        var max = 0;
        for (let cell of cpuPotentialCells) {
            let score = scoreBoard[cell[1]][cell[0]];
            if (max <= score) {
                max = score;
                cpuCell[0] = cell[0];
                cpuCell[1] = cell[1];
            }
        }
        Othello.flipStones(cpuCell[0], cpuCell[1]);
        Common.drawStones(ctx);
    },

    findAttackCells: function() {
        let attackCells = [];
        const attackPotentialCells = [
            [1, 1], [1, 8], [8, 1], [8, 8],
            [4, 4], [4, 5], [5, 4], [5, 5]
        ];
        for (const attackPotentialCell of attackPotentialCells) {
            const [x, y] = attackPotentialCell;
            if (point[x][y] !== 1) continue;

            let attackFail = false;
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (dx === 0 && dy === 0) continue;
                    let n = 1;
                    while (point[x + n * dx][y + n * dy] === 2) {
                        n++;
                    }
                    if (n > 1 && point[x + n * dx][y + n * dy] === 1) {
                        attackFail = true;
                        break;
                    }
                }
                if (attackFail) break;
            }
            if (!attackFail) {
                attackCells.push([x, y]);
            }
        }
        console.log(attackCells);
        return attackCells;
    },

    attack: function(ctx) {
        const attackCells = CPU.findAttackCells();
        if (attackCells.length == 0) {
            CPU.play(ctx);
        } else {
            let corners = [];
            let centers = [];
            corners = attackCells.filter(cell => {
                let [x, y] = cell;
                return (x === 1 || x === 8) && (y === 1 || y === 8);
            });
            centers = attackCells.filter(cell => {
                let [x, y] = cell;
                return (x === 4 || x === 5) && (y === 4 || y === 5);
            });
            let attackX;
            let attackY;
            if (corners.length >= 1) {
                let attackIdx = Math.floor(Math.random() * corners.length);
                [attackX, attackY] = corners[attackIdx];
            } else {
                let attackIdx = Math.floor(Math.random() * centers.length);
                [attackX, attackY] = centers[attackIdx];
            }
            alert("CPUがAttackをします！");
            Attack.execAttack(ctx, attackX, attackY);
            attackWhite = false;
        }
    },

    sleep: function(second) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, second * 1000)
        });
    } 
}