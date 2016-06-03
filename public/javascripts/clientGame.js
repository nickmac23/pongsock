var socket = io();
var canvas = document.getElementById("a");
var ctx = canvas.getContext("2d");
var player;
ctx.canvas.width = 1067.25;
ctx.canvas.height = 507;
var shipimg = [];
shipimg[1] = new Image();
  shipimg[1].src = '/images/mship1.png';
shipimg[0] = new Image();
  shipimg[0].src = '/images/flacon.png';
// var astroidMed = new Image();
//     astroidMed.src = 'pic/Astromedium.png'
var astroidBig = new Image();
  astroidBig.src = '/images/Asteroid.png'
var shot = new Image();
  shot.src = '/images/Bluecenter.png'

document.getElementById('start').addEventListener('click', function () {
  socket.emit('start')
})
socket.on('self', function(playernum){
  player = playernum;
})

var keysDown = {};
var count = 0;
addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);


function move (ship) {
  if (ship) {
    if( 32 in keysDown){
        socket.emit('fire', {x: ship.x, y:ship.y, angle: ship.rad})
        delete keysDown[32]
    }
    if(39 in keysDown ) {ship.rad += 6*(Math.PI/180)};
    if(37 in keysDown) {ship.rad -= 6*(Math.PI/180)};
    if(ship.rad === 360*(Math.PI/180) || ship.rad === -360*(Math.PI/180)){
      ship.rad = 0;
    }
    if(38 in keysDown){
      ship.vx += ship.thrust * Math.sin(ship.rad);
      ship.vy += ship.thrust * Math.cos(ship.rad);
    }if(40 in keysDown){
      ship.vx -= ship.thrust * Math.sin(ship.rad);
      ship.vy -= ship.thrust * Math.cos(ship.rad);
    }
  }
}


function shipsDraw (ships){
  for (var i = 0; i < ships.length; i++) {
    if (!(ships[i] === false) ) {
      ships[i].img = shipimg[0];
      ctx.save();
      ctx.translate(ships[i].x, ships[i].y);
      ctx.rotate(ships[i].rad);
      ctx.drawImage(shipimg[0], -(ships[i].img.width/2), -(ships[i].img.height/2));
      ctx.restore();
      ctx.save();
    }
  }
}
function bulletDraw (bullets){
  for (var i = 0; i < bullets.length; i++) {
    if (!(bullets[i] === false) ) {
      ctx.drawImage(shot, bullets[i].x - 25 , bullets[i].y - 10)
    }
  }
}
function roidsDraw (roids) {
  for (var i = 0; i < roids.length; i++) {
    ctx.save();
    ctx.translate(roids[i].x, roids[i].y);
    ctx.rotate(roids[i].rad);
    ctx.drawImage(astroidBig, -(roids[i].width/2), -(roids[i].height/2));
    ctx.restore();
    ctx.save();

    // ctx.drawImage(astroidBig, roids[i].x , roids[i].y )
  }
}

socket.on('png', function(obj){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  move(obj.ships[player]);
  shipsDraw(obj.ships)
  roidsDraw(obj.roids)
  bulletDraw(obj.bullets)
  socket.emit('update', {ship: obj.ships[player], player: player})
})

window.setInterval(function () {
  socket.emit('cat');
}, 10);
