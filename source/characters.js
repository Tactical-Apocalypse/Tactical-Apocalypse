///////////////
// Imports
///////////////
// import {canvas, ctx} from "./map.js";


////////////////
// DOM Elements
////////////////
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const tank = document.querySelector('#tank');


////////////////
// Variables
////////////////
const keyMap = []; // Keep tracks of which key(s) are being pressed down at any given moment


/////////////////////
// Event listeners
/////////////////////
// Adds a key as an element to the keyMap array whenever a key is pressed
document.addEventListener("keydown", keyPressed);
  
// Removes a key as an element from the keyMap array whenever a key is released
document.addEventListener("keyup", keyReleased);

// 
// canvas.addEventListener ('mousemove', rotatePlayer);

/////////////////////
// Event Hadelers
/////////////////////
// Setup for player movement
function keyPressed (event) {
    let key = event.key;
    if (!keyMap.includes(key)) {
      keyMap.push(key);
    };
};

function keyReleased (event) {
    let key = event.key;
    if (keyMap.includes(key)) {
      keyMap.splice(keyMap.indexOf(key), 1);
    };
};


/////////////////////
// Character classes
/////////////////////
// Player class for the first-person-shooter that the user controls
class Player {
  constructor() {
    this.pos = {
      x: canvas.width / 2 - 3,
      y: canvas.height / 2 - 3,
    };
    this.speed = 1;
    this.radius = 0;
    this.angle = 0 //-Math.PI / 2;
  }

  // Creates the player inside of the canvas
  create(context) {
    context.save();
    let tX = this.pos.x;
    let tY = this.pos.y;
    context.translate(tX, tY);
    context.rotate(this.angle);
    context.translate(-tX, -tY);
    context.fillStyle = 'orange';
    context.drawImage(tank, this.pos.x-6, this.pos.y-6, 12, 20)
    // context.fillRect(this.pos.x-3, this.pos.y-3, 6, 6);
    context.restore();
  }

  // Aims/rotates player towards the position of the mmouse
  rotate({x, y}) {
    // Find x-distance between the player and the mouse position
    let distanceX = x - this.pos.x;
    // Find y-distance between the player and the mouse position
    let distanceY = y - this.pos.y;
    // Reassign this.angle to the angle in the plane from the player to the cursor in radians
    this.angle = Math.atan2(distanceX, -distanceY);
  }

  move() {
    // Moves the player up
    if (keyMap.includes("w") && this.pos.y - this.speed - this.radius >= 0) {
      this.pos.y -= this.speed;
    }
    // Movrs the player down
    if (keyMap.includes("s") && this.pos.y + this.speed + this.radius + 2 < canvas.height) {
      this.pos.y += this.speed;
    }
    // Moves the player to the left
    if (keyMap.includes("a") && this.pos.x - this.speed - this.radius >= 0) {
      this.pos.x -= this.speed;
    }
    // Moves the player to the right
    if (keyMap.includes("d") && this.pos.x + this.speed + this.radius + 2 < canvas.width) {
      this.pos.x += this.speed;
    }
  }
  // Updates the position of the player during each frame
  update() {
    this.move();
  }
}

// Creates zombie inside of canvas
class Zombie {
  speed = 1.1;
  radius = 20;
  health = 5;

  constructor(player) {
    this.vector = {
      x: width + this.radius,
      y: random(-this.radius, height + this.radius),
    };
    this.rotate(player);
  }

  create(context) {
    //context.beginPath();
    context.fillRect(this.pos.x, this.pos.y, 10, 10);
    //context.stroke();
  }

  rotate(player) {}
  update(player, zombies) {
    this.rotate(player);
  }
  render(ctx) {}
}

///Movement///


///////////////
// Exports
///////////////
export default Player;
