
function Asteroids (width, height, size, pic, ship, bullets, breaker){
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.size= size;
  this.img= pic;
  this.val = true;
  this.width = width;
  this.height = height;
  this.rad = 0;
  this.start = function (px, py) {
    var rx = Math.random() * (3 + 3) - 3;
    var ry = Math.random() * (3 + 3) - 3;
    this.vy = rx != 0 ? rx : 1;
    this.vx = ry != 0 ? ry : -1;
    if(px){
      this.x = px;
      this.y = py;
    }else{
      var top = (Math.random() * (507 - 0));
      var bot = (Math.random() * (1067.25 - 0));
      this.x = 200 * ( 1 - ( top/bot) ) + 50;
      this.y = 200 * ( 1 - ( bot/top )) + 50;
    }
  };
  this.draw = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.rad += .005;
    this.wall();
  }
//   this.bounce = function () {
//     for (var i = 0; i < ships.length; i++) {
//       if (this.x <= ships[i].x  &&
//         this.x + this.width  > ships[i].x &&
//         this.y < ships[i].y  &&
//         this.height + this.y > ships[i].y) {
//           ships[i].val = false;
//     }
//   }
// }
    // for (var i = 0; i < bullets.length; i++) {
    //   if (this.x < bullets[i].x  &&
    //     this.x + this.width  > bullets[i].x &&
    //    this.y < bullets[i].y  &&
    //    this.height - 30 + this.y > bullets[i].y && bullets[i].val === true) {
    //      bullets[i].val = false;
    //      this.val = false;
    //      if( this.size === 'big'){
    //        breaker (this.x, this.y, 'big');
    //      }if(this.size === 'small'){
    //        breaker (this.x, this.y, 'small');
    //      }
    //   }
    // }
  this.wall = function () {
    if(this.x > 1067.25){this.x = 0 - this.width/2};
    if(this.x + this.width < 0){this.x = 1067.25};
    if(this.y > 507){this.y = 0 - this.height/2};
    if(this.y + this.height < 0){this.y = 507};
  }
}
module.exports = Asteroids;
