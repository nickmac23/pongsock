var io = require('socket.io')();
var degree = 0;
var Ships = require('../public/javascripts/ball.js')
var i = -1;
// every time a socket connection is made, this function is called
var ships = [];
// var ship = new Ships ( 1067.25, 507)

io.on('connection', function (socket) {
  i++;
  ships[i] = (new Ships ( 1067.25, 507))
  io.sockets.connected[socket.id].emit('self', i);
  socket.on('cat', function (){
    for (var j = 0; j < ships.length; j++) {
      ships[j].draw();
    }
    socket.emit('png', ships)
  })
  socket.on('update', function(update){
    ships[update.player].vx = update.ship.vx;
    ships[update.player].vy = update.ship.vy;
    ships[update.player].rad = update.ship.rad;
  })
  // socket.on('keydown', function (keysDown) {
  //   if(keysDown === 39) {degree += 5};
  //   if(keysDown === 37) {degree -= 5};
  //   if(degree === 360 || degree === -360){
  //     degree = 0;
  //   }
  //   ship.rad = (Math.PI/180)*degree;
  //   if(keysDown === 38 ){
  //     ship.vx += ship.thrust * Math.sin(ship.rad);
  //     ship.vy += ship.thrust * Math.cos(ship.rad);
  //   }if(keysDown === 40 ){
  //     ship.vx -= ship.thrust * Math.sin(ship.rad);
  //     ship.vy -= ship.thrust * Math.cos(ship.rad);
  //   }
  //   socket.emit('png', ship)
  // })
  socket.on('disconnect', function () {
   i--;
   ships[i] = null;
  });
})

module.exports = io;
