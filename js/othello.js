"use strict";

var Othello = Othello || {
    changeTurn: function() {
        var oppositeColor = 3 - colorOfTurn;
        colorOfTurn = oppositeColor;
    },

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
        blackCount.textContent = Othello.countStones()['black'];
        whiteCount.textContent = Othello.countStones()['white'];
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
                Othello.fixStoneColor(ctx,i-1,j-1,color);
            }
        }
    },

    fixStoneColor: function(ctx,inx,iny,color){
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
            Othello.changeTurn();
        }
    },

    // fix the coordinate to make the left top point of canvas the origin
    fixCoordinate: function(canvas){
        var rect = canvas.getBoundingClientRect();
        mouseX = mouseX - rect.left;
        mouseY = mouseY - rect.top;
    
        if (mouseX < 0 || 640 < mouseX) {
            return;
        } else if (mouseY < 0 || 640 < mouseY) {
            return;
        }
    
        inx = Math.floor(mouseX / 80) + 1;
        iny = Math.floor(mouseY / 80) + 1;
    },

    countStones: function() {
        var emptyCount = 0;
        var blackCount = 0;
        var whiteCount = 0;
    
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                switch (point[i][j]) {
                    case 0:
                        emptyCount++;
                        break;
                    case 1:
                        blackCount++;
                        break;
                    case 2:
                        whiteCount++;
                        break;
                }
            }
        }
    
        var stones = {'empty':emptyCount, 'black':blackCount, 'white':whiteCount};
        return stones;
    },

    checkGameOver: function() {
        var stones = Othello.countStones();
    
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
        if (Othello.countStones()['black'] == 0 || Othello.countStones()['white'] == 0) return;
        if (!Othello.canPlace()) {
            passCount ++;
            var playerColor = colorOfTurn == 1 ? "黒" : "白";
            var alertFunc = function() {
                alert(playerColor + 'は石を置けません\nパスします。');
            }
            setTimeout(alertFunc, 500);
            Othello.changeTurn();
        }
    },

    checkHalfOccupied: function() {
        if (Othello.countStones()['empty'] == 68) {
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
        Othello.deleteStone(ctx, inx, iny);
    
        canvas.removeEventListener('click', attackEvent, {once:false});
        Othello.changeTurn();
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
};