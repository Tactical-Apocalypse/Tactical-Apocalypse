///////////////
// Imports
///////////////
import Player from "./source/player.js";
import Bullet from './source/bullet.js'
import animate from "./source/animations.js";
import Zombie from "./source/zombie.js";


///////////////
// Variables
///////////////
export const keyMap = []; // Keep tracks of which key(s) are being pressed down at any given moment
const bullets = []; // Keeps track of the bullets that ar shot by the player
export const player = new Player (); // Creates a player instance
export const zombies = [ new Zombie(player) ]; // Keeps track of the number of active zombies

////////////////
// DOM Elements
////////////////
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");


/////////////////////
// Event listeners
/////////////////////
window.onload = function () {
  resizeCanvas();
}; // Resizes canvas to fit the innerWidth and innerHeight of the webpage upon load
window.onresize = function () {
  resizeCanvas();
}; // Resizes canvas to fit the innerWidth and innerHeight of the webpage upon webpage resizing

document.addEventListener("keydown", keyPressed); // Adds a key as an element to the keyMap array whenever a key is pressed
document.addEventListener("keyup", keyReleased); // Removes a key as an element from the keyMap array whenever a key is released
canvas.addEventListener ('mousemove', rotatePlayer); // Rotates player to rotate towards mouse position
document.addEventListener("keydown", fireBullet);

//////////////////
// Event Hadelers
//////////////////
// Setup for making the canvas dynamic and adpt to the window viewport size
function resizeCanvas () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

// Setup for player movement
function keyPressed (event) {
  let key = event.key;
  if (!keyMap.includes(key)) {
    keyMap.push(key);
  };
  console.log(keyMap);
};

function keyReleased (event) {
  let key = event.key;
  if (keyMap.includes(key)) {
    keyMap.splice(keyMap.indexOf(key), 1);
  };
  console.log(keyMap);
};

// Setup for player rotation
function rotatePlayer (event) {
  const mousePosition = mousePointer(event);
  player.rotate(mousePosition);
};

function mousePointer (event) {
  // Element.getBoundingClientRect() return an object of properties that describes the position and size of the element that calls the function
  const rect = canvas.getBoundingClientRect();
  // The x-coordinate of the mouse is represented by the x-position of the mouse within the screen viewport (clientX) minus the x-coordinate value of the canvas (rect.left)
  const x = event.clientX - rect.left;
  // The y-coordinate of the mouse is represented by the y-position of the mouse within the screen viewport (clientY) minus the x-coordinate value of the canvas (rect.top)
  const y = event.clientY - rect.top;
  return {x, y};
};

// Setup for firing bullets
function fireBullet (event) {
  if (event.code === 'Space') {
    bullets.push(
      new Bullet(player.pos.x, player.pos.y, player.angle));
    };
  };
  
  
///////////////////
// New Frame Logic
///////////////////
// Updates each animation frame
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //refreshes canvas
  player.update();
  player.create(ctx);
  console.log("update");
  bullets.forEach(bullet => {
    bullet.update(bullets)
    bullet.render(ctx)
  })
  zombies.forEach(zombie => {
    zombie.update(player, zombies)
    zombie.create(ctx)
  });
  player.update();
  player.create(ctx);
};

animate(update);
///////////////
// Exports
///////////////
// export {
//   keyMap,
//   bullets,
//   zombies
// };
// export default {
//   random,
//   distance,
//   mousePointer
// }