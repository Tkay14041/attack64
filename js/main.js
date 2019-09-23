"use strict";

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
// chance of attack button
var attackBlack = true;
var attackWhite = true;

var canvasEvent;
var attackEvent;

var isHalfOccupied;

window.onload = function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var turnText = document.getElementById('turn-text');
    turnText.textContent = "黒のターンです";

    var blackCount = document.getElementById('black-count');
    blackCount.textContent = 2;
    var whiteCount = document.getElementById('white-count');
    whiteCount.textContent = 2;

    

    canvasEvent = function(event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
        Othello.fixCoordinate(canvas);
        Othello.flipStones(inx,iny);
        Othello.drawStones(ctx);
        Othello.setTrunText(turnText);
        Othello.showStoneCount(blackCount, whiteCount);
        Othello.passCheck()
        Othello.checkGameOver();
        Othello.checkHalfOccupied();
        if (isHalfOccupied) {
            document.getElementById('button').disabled = false;
        }
    }

    attackEvent = function(event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
        Othello.fixCoordinate(canvas);
        Othello.execAttack(ctx, inx, iny);
        Othello.setTrunText(turnText);
        Othello.showStoneCount(blackCount, whiteCount);
    }

    canvas.addEventListener('click', canvasEvent, {once:false});
    initialize(ctx);

    var attackBtn = document.getElementById('attack-btn');
    attackBtn.addEventListener('click', function() {
        if (colorOfTurn == 1 && attackBlack && isHalfOccupied) {
            canvas.removeEventListener('click', canvasEvent, {once:false});
            alert('黒のAttack!');
            canvas.addEventListener('click', attackEvent, {once:false});
        } else if (colorOfTurn == 2 && attackWhite && isHalfOccupied) {
            canvas.removeEventListener('click', canvasEvent, {once:false});
            alert('白のAttack!');
            canvas.addEventListener('click', attackEvent, {once:false});
        } else if (!isHalfOccupied) {
            alert('盤面が半分埋まるまでAttackできません');
        } else {
            alert('Attackはもう使えません…');
        }
    }, false);
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
  Othello.drawStones(ctx);
}