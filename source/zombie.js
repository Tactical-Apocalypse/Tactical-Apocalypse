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
  speed = 1.5
  radius = 0
  health = 2

  constructor(player) {
    this.pos = {
      x: random(0, canvas.width),
      y: random(-300, 0)
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
    context.drawImage(zombie, this.pos.x-20, this.pos.y-30, 60, 40);
    context.restore();
  }
  
  rotate(player) {
    let dy = player.pos.y - this.pos.y;
    let dx = player.pos.x - this.pos.x;
    this.angle = Math.atan2(dy, dx);
  }

  update(player, zombies) {
    if(this.health <= 0) {
    zombies = zombies.splice(zombies.indexOf(this), 1)
    return
  }

  this.rotate(player)
  this.pos.x += Math.cos(this.angle) * this.speed
  this.pos.y += Math.sin(this.angle) * this.speed
  }
};

function random (min, max) {
  return (Math.random() * (max - min)) + min;
};
///////////////
// Exports
///////////////
export default Zombie;
