var io = require('socket.io')();
var Ships = require('../public/javascripts/shipObj.js')
var asteroids = require('../public/javascripts/ateroidObj.js')
var playerNum = -1;
var ships = [];


roids = [];
for (var x = 0; x < 1; x++ ) { roids.push(new asteroids (100, 100, 'small', ships[0])) };
for (var i = 0; i < roids.length; i++) { roids[i].start() };

io.on('connection', function (socket) {
  playerNum++;
  ships.push(new Ships ( 1067.25, 507))
  io.sockets.connected[socket.id].emit('self', playerNum);
  socket.on('cat', function (){
    for (var j = 0; j < ships.length; j++) {
      if (ships[j]) {
        ships[j].draw();
      }
    }
    for (var k = 0; k < roids.length; k++) {
      if (roids[k]) {
        roids[k].draw();
      }
    }
    socket.emit('png', {ships: ships, roids: roids})
  })
  socket.on('update', function(update){
    ships[update.player].vx = update.ship.vx;
    ships[update.player].vy = update.ship.vy;
    ships[update.player].rad = update.ship.rad;
  })

  socket.on('disconnect', function () {
    ships[i] = false;
   i--;
  });
})

module.exports = io;
