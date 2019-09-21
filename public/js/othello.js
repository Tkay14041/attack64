var passCount = 0;

export function changeTurn(colorOfTurn) {
    var oppositeColor = 3 - colorOfTurn;
    colorOfTurn = oppositeColor;
}



export function showStoneCount(blackCount, whiteCount) {
    blackCount.textContent = countStones()['black'];
    whiteCount.textContent = countStones()['white'];
}

// draw stones on the board
export function drawStones(ctx, point){
    for (var i = 1; i < 10; i++) {
        for (var j = 1; j < 10; j++) {
            var color = '';
            if (point[i][j] == 1) {
                color = 'black';
            } else if (point[i][j] == 2) {
                color = 'white';
            }
            fixStoneColor(ctx,i-1,j-1,color);
        }
    }
}

export function fixStoneColor(ctx,canvasX,canvasY,color){
    if (color != 'black' && color != 'white') return;
    ctx.beginPath();
    var centerX = 40 + canvasX * 80;
    var centerY = 40 + canvasY * 80;
    var radius = 35;
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fill();
}

// place and flip the stones
export function flipStones(canvasX, canvasY, colorOfTurn, point){
    // fliped or not
    var flag = false;
    var oppositeColor = 3 - colorOfTurn;
    if (point[canvasX][canvasY] != 0)　return;
    // 8 directions
    for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
            if (dx == 0 && dy == 0)　continue;
            var n = 1;
            while (point[canvasX + (n * dx)][canvasY + (n * dy)] == oppositeColor) {
                n++;
            }
            if (n > 1 && point[canvasX + n * dx][canvasY + n * dy] == colorOfTurn) {
                for (var i = 1; i <= n; i++) {
                    point[canvasX + i * dx][canvasY + i * dy] = colorOfTurn;
                }
                flag = true;
            }
        }
    }
    if (flag) {
        passCount = 0;
        point[canvasX][canvasY] = colorOfTurn;
        changeTurn(colorOfTurn);
    }
}

// fix the coordinate to make the left top point of canvas the origin
export function fixCoordinate(canvas, mouseX, mouseY) {
    var rect = canvas.getBoundingClientRect();
    mouseX = mouseX - rect.left;
    mouseY = mouseY - rect.top;

    if (mouseX < 0 || 640 < mouseX) {
        return;
    } else if (mouseY < 0 || 640 < mouseY) {
        return;
    }

    var canvasX = Math.floor(mouseX / 80) + 1;
    var canvasY = Math.floor(mouseY / 80) + 1;
    
    return {canvasX, canvasY};
}

export function countStones() {
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
}

export function checkGameOver() {
    var stones = countStones();

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
}

export function getEmptyCells() {
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
}

export function canPlace() {
    var oppositeColor = 3 - colorOfTurn;
    var emptyCells = getEmptyCells();
    // whether place stone or not for each empty cell
    for (var emptyCell of emptyCells) {
        var canvasX = emptyCell[0];
        var canvasY = emptyCell[1];
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx == 0 && dy == 0)　continue;
                var n = 1;
                while (point[canvasX + n * dx][canvasY + n * dy] == oppositeColor) {
                    n++;
                }
                if (n > 1 && point[canvasX + n * dx][canvasY + n * dy] == colorOfTurn) {
                    return true;
                }
            }
        }
    }
    return false;
}

export function passCheck() {
    if (getEmptyCells().length == 0) return;
    if (countStones()['black'] == 0 || countStones()['white'] == 0) return;
    if (!canPlace()) {
        passCount ++;
        var playerColor = colorOfTurn == 1 ? "黒" : "白";
        var alertFunc = function() {
            alert(playerColor + 'は石を置けません\nパスします。');
        }
        setTimeout(alertFunc, 500);
        changeTurn();
    }
}

export function checkHalfOccupied() {
    if (countStones()['empty'] == 68) {
        isHalfOccupied = true;
    } 
}

export function execAttack(ctx, canvasX, canvasY) {
    if (point[canvasX][canvasY] == 0) return;
    
    if (colorOfTurn == 1) {
        attackBlack = false;
    } else if (colorOfTurn == 2) {
        attackWhite = false;
    }

    point[canvasX][canvasY] = 0;
    deleteStone(ctx, canvasX, canvasY);

    canvas.removeEventListener('click', attackEvent, {once:false});
    changeTurn();
    canvas.addEventListener('click', canvasEvent, {once:false});
}

export function deleteStone(ctx, canvasX, canvasY) {
    ctx.beginPath();
    var startX = (canvasX - 1) * 80 + 1;
    var startY = (canvasY - 1) * 80 + 1;
    var side = 78;
    ctx.rect(startX, startY, side, side);
    ctx.strokeStyle = '#006600';
    ctx.fillStyle = '#006600';
    ctx.fill();
}