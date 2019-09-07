var mouseX;
var mouseY;
// variables for the array
var inx = 0;
var iny = 0;
// turn; black:1 white:2
var colorOfTurn = 1;
// array for the stones
var point = new Array(10);
for(var i = 0; i < 10; i++){
    point[i] = [0,0,0,0,0,0,0,0,0,0];
}

var passCount = 0;


onload = function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    canvas.addEventListener('click',function(event){
                mouseX = event.pageX;
                mouseY = event.pageY;
                fixCoordinate(canvas);
                flipStones(inx,iny);
                drawStones(ctx);
                checkGameOver();
                // TODO: 次のターンのプレイヤーが石を置けるかチェック
                    // 置ければpassを0にリセット&continue, 置けなければpass++
                        // pass == 1 → さらにturnColorチェンジ
                        // pass == 2 → gameOver
                },
                false);
    initialize(ctx);
};

// initialize the board
function initialize(ctx){
    ctx.beginPath();
    for (var i = 1; i < 8; i++) {
        ctx.moveTo(0,i*80);
        ctx.lineTo(640,i*80);
        ctx.moveTo(i*80,0);
        ctx.lineTo(i*80,640);
    }

    ctx.stroke();

    point[4][5] = 1;
    point[5][4] = 1;
    point[4][4] = 2;
    point[5][5] = 2;
    drawStones(ctx);
}


// draw stones on the board
function drawStones(ctx){
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

function fixStoneColor(ctx,inx,iny,color){
    if (color != 'black' && color != 'white') return;

    ctx.beginPath();
    var centerX = 40 + inx * 80;
    var centerY = 40 + iny * 80;
    var radius = 35;
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fill();
}

// place and flip the stones
function flipStones(inx,iny){
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
        colorOfTurn = oppositeColor;
    }
}

// fix the coordinate to make the left top point of canvas the origin
function fixCoordinate(canvas){
    rect = canvas.getBoundingClientRect();
    mouseX = mouseX - rect.left;
    mouseY = mouseY - rect.top;

    if (mouseX < 0 || 640 < mouseX) {
        return;
    } else if (mouseY < 0 || 640 < mouseY) {
        return;
    }

    inx = Math.floor(mouseX / 80) + 1;
    iny = Math.floor(mouseY / 80) + 1;
}

function countStones() {
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

function checkGameOver() {
    var stones = countStones();
    console.log(stones['black'], stones['white'], stones['empty']);

    if (stones['empty'] == 36) {
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

function canPlace() {
    var oppositeColor = 3 - colorOfTurn;

    // find empty cell from actual game board
    var emptyCells = [];
    for (i = 1; i < 9; i++) {
        for (j = 1; j < 9; j++) {
            if (point[i][j] == 0) {
                var emptyCell = [i, j];
                emptyCells.push(emptyCell);
            }
        }
    }
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
}
