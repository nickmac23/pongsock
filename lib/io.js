var io = require('socket.io')();
var Ships = require('../public/javascripts/shipObj.js')
var asteroids = require('../public/javascripts/ateroidObj.js')
var bullet = require('../public/javascripts/bulletObj.js')
var playerNum = -1;
var ships = [];
var bullets = [];



roids = [];
for (var x = 0; x < 1; x++ ) { roids.push(new asteroids (150, 120, 'small', ships)) };
for (var i = 0; i < roids.length; i++) { roids[i].start() };

function collide () {
    for (var j = 0; j < roids.length; j++) {
      for (var m = 0; m < bullets.length; m++) {
      for (var i = 0; i < ships.length; i++) {
          if (roids[j].x <= ships[i].x  &&
            roids[j].x + roids[j].width  > ships[i].x &&
            roids[j].y < ships[i].y  &&
            roids[j].height + roids[j].y > ships[i].y) {
              ships[i] = false;
          }
          if (roids[j].x < bullets[m].x  &&
            roids[j].x + roids[j].width  > bullets[m].x &&
            roids[j].y < bullets[m].y  &&
            roids[j].height - 30 + roids[j].y > bullets[m].y ) {
              bullets[m] = false;
              roids[j] = false;
          }
          // if (ships[i].x < bullets[m].x  &&
          //   ships[i].x + 50  > bullets[m].x &&
          //   ships[i].y < bullets[m].y  &&
          //   50 + ships[i].y > bullets[m].y ) {
          //     console.log('hit');
          //     bullets[m] = false;
          //     ships[i] = false;
          //  }
        }
      }
    }
  }

io.on('connection', function (socket) {
  socket.on('start', function () {
    playerNum++;
    ships.push(new Ships ( 1067.25, 507, 200, 200))
    io.sockets.connected[socket.id].emit('self', playerNum);
  })
  socket.on('cat', function (){
    collide();
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
    for (var m = 0; m < bullets.length; m++) {
      if (bullets[m]) {
        bullets[m].draw();
      }
    }
    socket.emit('png', {ships: ships, roids: roids, bullets: bullets})
  })
  socket.on('update', function(update){
    if (update.player >= 0) {
      ships[update.player].vx = update.ship.vx;
      ships[update.player].vy = update.ship.vy;
      ships[update.player].rad = update.ship.rad;
    }
  })
  var shott = -1;
  socket.on('fire', function (shot) {
    shott++
    bullets[shott] = new bullet (shot.x, shot.y, shot.angle)
    if (shott > 5) {
      shott = -1;
    }
  })
})

module.exports = io;
