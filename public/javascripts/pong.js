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
var keysDown = {};
addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);
socket.on('self', function(playernum){
  player = playernum;
})
console.log(player);
// /////////////ball/////////////////////////
socket.on('png', function(ships){
  console.log(player);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(39 in keysDown ) {ships[player].rad += 6*(Math.PI/180)};
  if(37 in keysDown) {ships[player].rad -= 6*(Math.PI/180)};
  if(ships[player].rad === 360*(Math.PI/180) || ships[player].rad === -360*(Math.PI/180)){
    ships[player].rad = 0;
  }
  if(38 in keysDown){
    ships[player].vx += ships[player].thrust * Math.sin(ships[player].rad);
    ships[player].vy += ships[player].thrust * Math.cos(ships[player].rad);
  }if(40 in keysDown){
    ships[player].vx -= ships[player].thrust * Math.sin(ships[player].rad);
    ships[player].vy -= ships[player].thrust * Math.cos(ships[player].rad);
  }
  for (var i = 0; i < ships.length; i++) {
    ships[i].img = shipimg[i];
    ctx.save();
    ctx.translate(ships[i].x, ships[i].y);
    ctx.rotate(ships[i].rad);
    ctx.drawImage(shipimg[i], -(ships[i].img.width/2), -(ships[i].img.height/2));
    ctx.restore();
    ctx.save();
  }


  socket.emit('update', {ship: ships[player], player: player})
})

window.setInterval(function () {
  socket.emit('cat');
}, 10);

addEventListener("keydown", function (e) {
  socket.emit('keydown', e.which);
});
