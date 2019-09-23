"use strict";

var Othello = Othello || {

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
                Othello.displayStone(ctx,i-1,j-1,color);
            }
        }
    },

    displayStone: function(ctx,inx,iny,color){
        if (color != 'black' && color != 'white') return;
        ctx.beginPath();
        var centerX = 40 + inx * 80;
        var centerY = 40 + iny * 80;
        var radius = 35;
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.fill();
    },

    // place and flip the stones
    flipStones: function (inx,iny){
        // fliped or not
        var flag = false;
        var oppositeColor = 3 - colorOfTurn;
        if (point[inx][iny] != 0)　return;
        // 8 directions
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx == 0 && dy == 0)　continue;
                var n = 1;
                while (point[inx + n * dx][iny + n * dy] == oppositeColor) {
                    n++;
                }
                if (n > 1 && point[inx + n * dx][iny + n * dy] == colorOfTurn) {
                    for (var i = 1; i <= n; i++) {
                        point[inx + i * dx][iny + i * dy] = colorOfTurn;
                    }
                    flag = true;
                }
            }
        }
        if (flag) {
            passCount = 0;
            point[inx][iny] = colorOfTurn;
            Common.changeTurn();
        }
    },

    checkGameOver: function() {
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

    canPlace: function() {
        var oppositeColor = 3 - colorOfTurn;
        var emptyCells = Othello.getEmptyCells();
        // whether place stone or not for each empty cell
        for (var emptyCell of emptyCells) {
            var inx = emptyCell[0];
            var iny = emptyCell[1];
            for (var dx = -1; dx <= 1; dx++) {
                for (var dy = -1; dy <= 1; dy++) {
                    if (dx == 0 && dy == 0)　continue;
                    var n = 1;
                    while (point[inx + n * dx][iny + n * dy] == oppositeColor) {
                        n++;
                    }
                    if (n > 1 && point[inx + n * dx][iny + n * dy] == colorOfTurn) {
                        return true;
                    }
                }
            }
        }
        return false;
    },

    passCheck: function() {
        if (Othello.getEmptyCells().length == 0) return;
        if (Common.countStones()['black'] == 0 || Common.countStones()['white'] == 0) return;
        if (!Othello.canPlace()) {
            passCount ++;
            var playerColor = colorOfTurn == 1 ? "黒" : "白";
            var alertFunc = function() {
                alert(playerColor + 'は石を置けません\nパスします。');
            }
            setTimeout(alertFunc, 500);
            Common.changeTurn();
        }
    }
};