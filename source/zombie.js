///////////////
// Imports
///////////////
// import random from "./utils.js";

////////////////
// DOM Elements
////////////////
const canvas = document.querySelector("#canvas");
const zombie = document.querySelector('#zombie');

////////////////
// Variables
////////////////


////////////////
// Zombie class
////////////////
class Zombie {
  speed = 1.1
  radius = 0
  health = 5

  constructor(player) {
    this.vector = {
      x: canvas.width + this.radius,
      y: random(-this.radius, canvas.height + this.radius)
    }
    this.rotate(player)
  }
    
  // Creates a zombie inside of the canvas
  create(context) {
    context.save();
    let tX = this.pos.x;
    let tY = this.pos.y;
    context.translate(tX, tY);
    context.rotate(this.angle);
    context.translate(-tX, -tY);
    context.drawImage(zombie, this.pos.x-20, this.pos.y-20, 60, 40);
    context.restore();
  }
  
  rotate(player) {
    let dy = player.vector.y - this.vector.y;
    let dx = player.vector.x - this.vector.x;
    this.angle = Math.atan2(dy, dx);
  }

  update(player, zombies) {
    if(this.health <= 0) {
    zombies = zombies.splice(zombies.indexOf(this), 1)
    return
  }

  this.rotate(player)
  this.vector.x += Math.cos(this.angle) * this.speed
  this.vector.y += Math.sin(this.angle) * this.speed
  }
};

function random (min, max) {
  return (Math.random() * (max - min)) + min;
};
///////////////
// Exports
///////////////
export default Zombie;
