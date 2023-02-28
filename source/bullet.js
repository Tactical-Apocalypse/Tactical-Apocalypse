///////////////
// Imports
///////////////
import { bullets, zombies } from "../index.js";
// import {bullets} from "../index,js";
// import {zombies} from "../index.js";

////////////////
// DOM Elements
////////////////
// const canvas = document.querySelector("#canvas");
// const ctx = canvas.getContext("2d");

////////////////
// Variables
////////////////
const width = window.innerWidth;
const height = window.innerHeight;

////////////////
// Bullet Class
////////////////

class Bullet {
  radius = 4;
  speed = 10;

  constructor(x, y, angle) {
    this.angle = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    this.vector = {
      x: x + this.angle.x * 40,
      y: y + this.angle.y * 40,
    };
  }

  boundary() {
    return (
      this.vector.x > width + this.radius ||
      this.vector.y > height + this.radius ||
      this.vector.x < 0 - this.radius ||
      this.vector.y < 0 - this.radius
    );
  }

  update(bullets, zombies) {
    console.log(bullets, zombies);
    if(this.boundary()) {
      bullets = bullets.splice(bullets.indexOf(this), 1)
      return
    };
    // for(let bullet in bullets) {
    //   for(let zombie in zombies) {
    //     let d = distance(zombie.pos.x, zombie.pos.y, this.vector.x, this.vector.y)
    //     console.log(bullets, zombies);
    //     if(d < 10) {
    //       bullets = bullets.splice(bullets.indexOf(this), 1);
    //       // zombies = zombies.splice(.indexOf(this), 1);
    //       zombies = zombies.splice(zombies.indexOf(zombie), 1);
    //     }
    //   }

    // }
    this.vector.x += this.angle.x * this.speed;
    this.vector.y += this.angle.y * this.speed;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.vector.x, this.vector.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
  }
}

export default Bullet;
