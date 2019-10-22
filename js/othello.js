"use strict";

var Othello = Othello || {

    // check stones which user can flip 
    getFlippableStones: function (inx, iny) {
        const flippableStones = [];
        const oppositeColor = 3 - colorOfTurn;
        if (point[inx][iny] !== 0) return;
        // 8 directions
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                let n = 1;
                while (point[inx + n * dx][iny + n * dy] === oppositeColor) {
                    n++;
                }
                if (n > 1 && point[inx + n * dx][iny + n * dy] === colorOfTurn) {
                    for (let i = 1; i <= n; i++) {
                        flippableStones.push([inx + i * dx, iny + i * dy]);
                    }
                }
            }
        }
        return flippableStones;
    },

    // place and flip the stones
    flipStones: function (inx, iny){
        // fliped or not
        const flippableStones = Othello.getFlippableStones(inx, iny);
        if (flippableStones.length !== 0) {
            for (const flippableStone of flippableStones) {
                const [x, y] = flippableStone;
                point[x][y] = colorOfTurn;
            }
            passCount = 0;
            point[inx][iny] = colorOfTurn;
        }
    },

    checkGameOver: function(canvas, attackBtn) {
        var stones = Common.countStones();
    
        if (stones['empty'] == 36 || passCount == 2) {
            var winMessage;
            if (stones['black'] < stones['white']) {
                winMessage = '白の勝ちです。';
            } else if (stones['black'] > stones['white']) {
                winMessage = '黒の勝ちです。';
            } else {
                winMessage = '引き分けです。'
            }
            var alertFunc = function() {
                alert('ゲーム終了です。\n' + winMessage);
            }
            setTimeout(alertFunc, 500);

            // disable all, event
            canvas.removeEventListener('click', canvasEvent, {once:false});
            attackBtn.setAttribute('disabled', 'true');
            return;
        } 
        
        if (stones['black'] == 0) {
            var alertFunc = function() {
                alert('ゲーム終了です。\n白の勝ちです。');
            }
            setTimeout(alertFunc, 500);
        } else if (stones['white'] == 0) {
            var alertFunc = function() {
                alert('ゲーム終了です。\n黒の勝ちです。');
            }
            setTimeout(alertFunc, 500);
        }
    },

    getEmptyCells: function() {
        var emptyCells = [];
        for (var i = 1; i < 9; i++) {
            for (var j = 1; j < 9; j++) {
                if (point[i][j] == 0) {
                    var emptyCell = [i, j];
                    emptyCells.push(emptyCell);
                }
            }
        }
        return emptyCells;
    },

    getPotentialCells: function() {
        var oppositeColor = 3 - colorOfTurn;
        var emptyCells = Othello.getEmptyCells();
        // whether place stone or not for each empty cell

        var potentialCells = [];
        for (var emptyCell of emptyCells) {
            var [inx, iny] = emptyCell;
            for (var dx = -1; dx <= 1; dx++) {
                for (var dy = -1; dy <= 1; dy++) {
                    if (dx == 0 && dy == 0)　continue;
                    var n = 1;
                    while (point[inx + n * dx][iny + n * dy] == oppositeColor) {
                        n++;
                    }
                    if (n > 1 && point[inx + n * dx][iny + n * dy] == colorOfTurn) {
                        var potentialCell = [inx, iny];
                        potentialCells.push(potentialCell);
                    }
                }
            }
        }
        return potentialCells;
    },

    checkPass: function() {
        if (Othello.getEmptyCells().length === 0) return false;
        if (Common.countStones()['black'] === 0 || Common.countStones()['white'] === 0) return false;
        if (Othello.getPotentialCells().length === 0) {
            passCount ++;
            var playerColor = colorOfTurn == 1 ? "黒" : "白";
            var alertFunc = function() {
                alert(playerColor + 'は石を置けません\nパスします。');
            }
            setTimeout(alertFunc, 500);
            return true;
        }
    }
};