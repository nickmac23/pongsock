function Bullets (positionX, positionY, angle){
  this.x = positionX;
  this.y = positionY;
  this.angle = angle;
  this.dv = 5;
  this.val = true;
  this.inity = positionX;;
  this.initx = positionY; 
  this.draw = function (){
    this.x += this.dv * Math.sin(this.angle);
    this.y -= this.dv * Math.cos(this.angle);
  }
};

module.exports = Bullets
