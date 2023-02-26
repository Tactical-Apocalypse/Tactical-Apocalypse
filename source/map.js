
///////////////
// Imports
///////////////
import animate from "./animations.js";
import Player from "./characters.js";
import Bullet from "./bullet.js";
////////////////
// DOM Elements
////////////////
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

//////////////
// Variables
//////////////
const mouseLocation = { mouseX: 0, mouseY: 0};


///////////////////
// New Frame Logic
///////////////////
// 
canvas.addEventListener('mousemove', rotatePlayer);

// Setup for player rotation
function rotatePlayer (event) {
    const mousePosition = mousePointer(event);
    player.rotate(mousePosition);
};

// Returns the [x, y] coordinate of the mouse position within the canvas
function mousePointer (event) {
    // return {x: event.clientX, y: event.clientY};
    // mouseLocation.mouseX = event.clientX;
    // mouse
    // Element.getBoundingClientRect() return an object of properties that describes the position and size of the element that calls the function
    const rect = canvas.getBoundingClientRect();
    // The x-coordinate of the mouse is represented by the x-position of the mouse within the screen viewport (clientX) minus the x-coordinate value of the canvas (rect.left)
    const x = event.clientX - rect.left;
    // The y-coordinate of the mouse is represented by the y-position of the mouse within the screen viewport (clientY) minus the x-coordinate value of the canvas (rect.top)
    const y = event.clientY - rect.top;
    return {x, y};
}

const player = new Player();
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //refreshes canvas
  player.update();
  player.create(ctx);
  console.log("update");
  bullets.forEach(bullet => {
    bullet.update(bullets)
    bullet.render(ctx)
  })
}

const bullets = []

document.body.addEventListener("click", () => {
  bullets.push(
    new Bullet(player.pos.x, player.pos.y, player.angle)
  )
})

const bulletUpdate = () => {
  bullets.forEach(bullet => {
    bullet.update(bullets)
    bullet.render(ctx)
  })
}
animate(bulletUpdate);
animate(update);


/////////////////////
// Event Listeners
/////////////////////

/////////////////////
// Event Handlers
/////////////////////

///////////////
// Exports
///////////////
export default {
  canvas,
  ctx,
};