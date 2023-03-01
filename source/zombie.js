///////////////
// Imports
///////////////
import {random} from "./utils.js";

////////////////
// DOM Elements
////////////////
const canvas = document.querySelector("#canvas");
const zombie = document.querySelector('#zombie');

////////////////
// Variables
////////////////
function spawnPoint () {
  let spawnPoints = [
    {x: random(canvas.width, canvas.width + 300), y: random(0, canvas.height) },//left spawn
    {x: random(-300, 0),  y: random(0, canvas.height)},// right spawn
    {x: random(0, canvas.width), y: random(-300, 0)}, //top spawn
    {x: random(0, canvas.width), y: random(canvas.height, canvas.height + 300)}// Bottom spawn
  ];
  let point = Math.floor(random(0, 4))
  console.log(point);
  return spawnPoints[point];
}



////////////////
// Zombie class
////////////////
class Zombie {
  radius = 50
  constructor(player,speed) {
    this.speed = speed
    this.pos = spawnPoint()
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

// function random (min, max) {
//   return (Math.random() * (max - min)) + min;
// };
///////////////
// Exports
///////////////
export default Zombie;
