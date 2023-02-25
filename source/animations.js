///////////////
// Imports
///////////////
// import canvas from "./map.js";

///////////////
// Variables
///////////////
let interval, start, now, then, elapsed;
let update;

///////////////////////
// Animation function
///////////////////////

// animationLoop is recursively called with requestAnimationFrame
function animationLoop() {
  requestAnimationFrame(animationLoop);
  now = Date.now(); // Number of milliseconds that elapsed since the epoch, January 1, 1970
  elapsed = now - then;
  if (elapsed > interval) {
    then = now - (elapsed % interval);
    update();
  }
}

// The start game function sets animation interval (60 fps) and starts the 'animationLoop' function
function startAnimation() {
  interval = 1000 / 60;
  then = Date.now();
  start = then;
  animationLoop();
}

// The animate function sets or reassigns update and starts the animation
function animate(newUpdate) {
  update = newUpdate;
  startAnimation();
}

///////////////
// Exports
///////////////
export default animate;
