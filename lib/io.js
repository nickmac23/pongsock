var io = require('socket.io')();
var Ships = require('../public/javascripts/shipObj.js')
var asteroids = require('../public/javascripts/ateroidObj.js')
var playerNum = -1;
var ships = [];


roids = [];
for (var x = 0; x < 1; x++ ) { roids.push(new asteroids (150, 120, 'small', ships)) };
for (var i = 0; i < roids.length; i++) { roids[i].start() };

function collide (roids, ships) {
  for (var i = 0; i < ships.length; i++) {
    for (var j = 0; j < roids.length; j++) {
      roids[j]
      if (roids[j].x <= ships[i].x  &&
        roids[j].x + roids[j].width  > ships[i].x &&
        roids[j].y < ships[i].y  &&
        roids[j].height + roids[j].y > ships[i].y) {
          ships[i] = false;
        }
    }
  }
}

io.on('connection', function (socket) {
  socket.on('start', function () {
    playerNum++;
    ships.push(new Ships ( 1067.25, 507))
    io.sockets.connected[socket.id].emit('self', playerNum);
  })
  socket.on('cat', function (){
    collide(roids, ships);
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
    if (update.player >= 0) {
      ships[update.player].vx = update.ship.vx;
      ships[update.player].vy = update.ship.vy;
      ships[update.player].rad = update.ship.rad;
    }
  })
})

module.exports = io;
