///////////////
// Imports
///////////////
import { keyMap } from "../index.js";
import Bullet from "./bullet.js";
import { bullets, player } from "../index.js";

let shots = document.getElementById("audio");
let footstep = document.getElementById("footstep");

////////////////
// Player class
////////////////
class Player {
  constructor(delay) {
    this.pos = {
      x: canvas.width * 2,
      y: canvas.height * 2,
    };
    this.delay = 0;
    this.speed = 1.7;
    this.radius = 0;
    this.angle = 0; //-Math.PI / 2;
  }

  // Creates the player inside of the canvas
  create(context) {
    context.save();
    let tX = this.pos.x;
    let tY = this.pos.y;
    context.translate(tX, tY);
    context.rotate(this.angle);
    context.translate(-tX, -tY);
    context.drawImage(shooter, this.pos.x - 20, this.pos.y - 20, 60, 40);
    context.restore();
  }

  // Aims/rotates player towards the position of the mmouse
  rotate({ x, y }) {
    // Find x-distance between the player and the mouse position
    let distanceX = x - this.pos.x;
    // Find y-distance between the player and the mouse position
    let distanceY = y - this.pos.y;
    // Reassign this.angle to the angle in the plane from the player to the cursor in radians
    this.angle = Math.atan2(distanceY, distanceX);
  }

  // Player movement can be controlled using W A S D
  move() {
    // Moves the player up
    if (keyMap.includes("w") && this.pos.y - this.speed - this.radius >= 0) {
      this.pos.y -= this.speed;
      footstep.play();
      footstep.playbackRate = 3;
    }
    // Movrs the player down
    if (
      keyMap.includes("s") &&
      this.pos.y + this.speed + this.radius < canvas.height
    ) {
      this.pos.y += this.speed;
      footstep.play();
      footstep.playbackRate = 3;
    }
    // Moves the player to the left
    if (keyMap.includes("a") && this.pos.x - this.speed - this.radius >= 0) {
      this.pos.x -= this.speed;
      footstep.play();
      footstep.playbackRate = 3;
    }
    // Moves the player to the right
    if (
      keyMap.includes("d") &&
      this.pos.x + this.speed + this.radius < canvas.width
    ) {
      this.pos.x += this.speed;
      footstep.play();
      footstep.playbackRate = 3;
    }
  }

  shoot () {
    if (this.delay <= 0) {
      if (keyMap.includes(" ")) {
        shots.play();
        shots.playbackRate = 3;
        const bullet = new Bullet(player.pos.x, player.pos.y, player.angle);
        bullets.push(bullet);
        this.delay = 50;
      };
    };
  }

  // Updates the position of the player during each frame
  update() {
    this.move();
    this.shoot();
    this.delay--;
  }
}

///////////////
// Exports
///////////////
export default Player;