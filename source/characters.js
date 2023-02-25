///////////////
// Imports
///////////////
// import {canvas, ctx} from "./map.js";


////////////////
// DOM Elements
////////////////
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// Player class for the first-person-shooter that the user controls
class Player {
    constructor () {
        this.pos = {
            x: canvas.width / 2,
            y: canvas.height / 2
        }
        this.speed = 2
        this.radius = 20
        this.angle = - Math.PI / 2
    }

    // Creates the player inside of the canvas
    create(context) {
        context.beginPath();
        context.fillRect(this.pos.x, this.pos.y, 10, 10);
        context.stroke();
    }

    rotate() {

    }

    move() {

    }

    update() {
      this.move()
    }

    render(context) {
        // rotation logic (doesn't do anything for now)
        context.save()
        
        let tX = this.pos.x 
        let tY = this.pos.y 
        context.translate(tX, tY)
        context.rotate(this.angle)
        context.translate(-tX, -tY)
      
        // Draw a circle as the body
        context.beginPath()
        context.fillStyle = "#ffe0bd"
        context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2)
        context.fill()
      
        // Draw a black rectangle as the "gun"    
        context.beginPath()
        context.fillStyle = "#000"
        context.rect(this.pos.x + this.radius + 15, this.pos.y - 5, 25, 10)
        context.fill()
      
        // Specify how the hands should look
        context.beginPath()
        context.strokeStyle = "#ffe0bd"
        context.lineCap = "round"
        context.lineWidth = 4
      
        // Right Hand
        context.moveTo(this.pos.x + 5, this.pos.y + this.radius - 2) 
        context.lineTo(this.pos.x + this.radius + 15, this.pos.y + 5)
        context.stroke()
      
        // Left Hand
        context.moveTo(this.pos.x + 5, this.pos.y - this.radius + 2)
        context.lineTo(this.pos.x + this.radius + 15, this.pos.y - 5)
        context.stroke()
      
        // also part of the rotation logic
        context.restore()
      }
  }

  // Creates zombie inside of canvas
  class Zombie {
    speed = 1.1
    radius = 20
    health = 5
  
    constructor(player) {
      this.vector = {
        x: width + this.radius,
        y: random(-this.radius, height + this.radius)
      }
      this.rotate(player)
    }

    create (context) {
        context.beginPath();
        context.fillRect(this.pos.x, this.pos.y, 10, 10);
        context.stroke();
    }
  
    rotate(player) {}
    update(player, zombies) {
      this.rotate(player)
    }
    render(ctx) {}
  }
  

///////////////
// Exports
///////////////
export default Player