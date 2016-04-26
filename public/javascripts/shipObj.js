function Ships ( width, height) {
  this.x = width/2,
  this.y = height/2,
  this.vy = 0.5,
  this.vx = 0,
  this.thrust = 0.05,
  this.rad = 0,
  this.val = true,
  this.wall = function () {
    if(this.x > width){this.x = 0};
    if(this.x < 0){this.x = width};
    if(this.y > height){this.y = 0};
    if(this.y < 0){this.y = height};

  },
  this.draw = function () {
    // move();
    this.wall();
    this.x += this.vx;
    this.y -= this.vy;
  }
}


module.exports = Ships;
