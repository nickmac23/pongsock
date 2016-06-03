function Ships ( cWidth, cHeight, width, height) {
  this.x = cWidth/2,
  this.y = cHeight/2,
  this.vy = 0.5,
  this.vx = 0,
  this.thrust = 0.05,
  this.rad = 0,
  this.width = width,
  this.height = height,
  this.wall = function () {
    if(this.x > cWidth){this.x = 0};
    if(this.x < 0){this.x = cWidth};
    if(this.y > cHeight){this.y = 0};
    if(this.y < 0){this.y = cHeight};
  },
  this.draw = function () {
    // move();
    this.wall();
    this.x += this.vx;
    this.y -= this.vy;
  }
}


module.exports = Ships;
