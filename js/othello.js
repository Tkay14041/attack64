var mouseX;
var mouseY;
// variables for the array
var inx = 0;
var iny = 0;
// turn; black:1 white:2
var turn = 1;
// array for the stones
var point = new Array(10);
for(var i=0; i<10; i++){
    point[i] = [0,0,0,0,0,0,0,0,0,0];
}
 
onload = function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
 
    canvas.addEventListener('click',function(event){
                mouseX = event.pageX;
                mouseY = event.pageY;
                fixCoordinate(canvas);
                flipStones(inx,iny);
                drawStones(ctx);
                },
                false);
    initialize(ctx);
};
 
// initialize the board
function initialize(ctx){
    ctx.beginPath();
    for(var i = 1; i < 8; i++){
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
    for(var i=1;i<10;i++){
        for(var j=1;j<10;j++){
            var color = '';
            if(point[i][j] == 1){
                color = 'black';
            }else if(point[i][j] == 2){
                color = 'white';
            }
            fixStoneColor(ctx,i-1,j-1,color);
        }
    }
}

function fixStoneColor(ctx,inx,iny,color){
    if (color != 'black' && color != 'white') return;
    ctx.beginPath();
    ctx.arc(40+inx*80, 40+iny*80, 35, 0, Math.PI*2, true);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fill();
}

// place and flip the stones
function flipStones(inx,iny){
    // fliped or not
    var flag = false;
    if(point[inx][iny]!=0)　return;
    // 8 directions
    for(var dx = -1; dx <= 1; dx++){
        for(var dy = -1; dy <= 1; dy++){
            if(dx == 0 && dy == 0)　continue;
            var n = 1;
            while(point[inx + n*dx][iny + n*dy] == 3 - turn){
                n++;
            }
            if(n > 1 && point[inx + n*dx][iny + n*dy] == turn){
                n = 1;
                while(point[inx + n*dx][iny + n*dy] == 3 - turn){
                    point[inx + n*dx][iny + n*dy] = turn;
                    n++;
                }
            flag = true;
            }
        }
    }
    if(flag){
    point[inx][iny] = turn;
    turn = 3 - turn;
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
