///////////////
// Imports
///////////////
import Player from "./source/player.js";
import Bullet from "./source/bullet.js";
import animate from "./source/animations.js";
import Zombie from "./source/zombie.js";
import { distance } from "./source/utils.js";
import { random } from "./source/utils.js";
///////////////
// Variables
///////////////
export const keyMap = []; // Keep tracks of which key(s) are being pressed down at any given moment
export const bullets = []; // Keeps track of the bullets that ar shot by the player
export const player = new Player(); // Creates a player instance
export const zombies = [new Zombie(player)]; // Keeps track of the number of active zombies
let score = 0;
let gameEnd = false;
let shots = document.getElementById("audio");
let footstep = document.getElementById("footstep");
let sound = document.getElementById("sound");
let background = document.getElementById("background");
let isPause = false;

let round = 1;
////////////////
// DOM Elements
////////////////
export const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const main = document.querySelector("main");
const scoreElement = document.querySelector("#score");
const roundElement = document.querySelector("#round");
let spawnPoints = [
  { x: random(canvas.width, canvas.width + 300), y: random(0, canvas.height) }, //right spawn
  { x: random(-300, 0), y: random(0, canvas.height) }, // left spawn
  { x: random(0, canvas.width), y: random(-300, 0) }, //top spawn
  { x: random(0, canvas.width), y: random(canvas.height, canvas.height + 300) }, // Bottom spawn
];
console.log(spawnPoints[0]);
/////////////////////
// Event listeners
/////////////////////
window.onload = function () {
  resizeCanvas();
}; // Resizes canvas to fit the innerWidth and innerHeight of the webpage upon load
window.onresize = function () {
  resizeCanvas();
}; // Resizes canvas to fit the innerWidth and innerHeight of the webpage upon webpage resizing
sound.addEventListener("click", soundbutton);
document.addEventListener("keydown", keyPressed); // Adds a key as an element to the keyMap array whenever a key is pressed
document.addEventListener("keyup", keyReleased); // Removes a key as an element from the keyMap array whenever a key is released
canvas.addEventListener("mousemove", rotatePlayer); // Rotates player to rotate towards mouse position
document.addEventListener("keydown", fireBullet);
setInterval(newRound, 10000);
let roundMulti = 1000 / (round * round);
console.log(roundMulti);
setInterval(spawnZombie, roundMulti); // Spawns zombies in intervals
document.addEventListener("keydown", pauseGame);

//////////////////
// Event Handelers
//////////////////
// Setup for making the canvas dynamic and adpt to the window viewport size
function resizeCanvas() {
  canvas.width = window.innerWidth / 2;
  canvas.height = window.innerHeight / 2;
}

// Setup for player movement
function soundbutton() {
  if (pause === true) {
    background.play();
    pause = false;
  } else {
    background.pause();
    pause = true;
  }
}
function keyPressed(event) {
  let key = event.key;
  if (!keyMap.includes(key)) {
    footstep.play();
    footstep.playbackRate = 3;
    keyMap.push(key);
  }
}

function keyReleased(event) {
  let key = event.key;
  if (keyMap.includes(key)) {
    keyMap.splice(keyMap.indexOf(key), 1);
  }
}

// Setup for player rotation
function rotatePlayer(event) {
  const mousePosition = mousePointer(event);
  player.rotate(mousePosition);
}

function mousePointer(event) {
  // Element.getBoundingClientRect() return an object of properties that describes the position and size of the element that calls the function
  const rect = canvas.getBoundingClientRect();
  // The x-coordinate of the mouse is represented by the x-position of the mouse within the screen viewport (clientX) minus the x-coordinate value of the canvas (rect.left)
  const x = event.clientX - rect.left;
  // The y-coordinate of the mouse is represented by the y-position of the mouse within the screen viewport (clientY) minus the x-coordinate value of the canvas (rect.top)
  const y = event.clientY - rect.top;
  return { x, y };
}

// Setup for firing bullets
function fireBullet(event) {
  if (event.code === "Space") {
    shots.play();
    shots.playbackRate = 3;
    const bullet = new Bullet(player.pos.x, player.pos.y, player.angle);
    bullets.push(bullet);
  }
}

// Setup for spawning zombies
function spawnZombie() {
  zombies.push(new Zombie(player, round));
  console.log(zombies);
}

// Setup for killing zombies
function checkContact(bullets, zombies) {
  bullets.forEach((bullet) => {
    zombies.forEach((zombie) => {
      let d = distance(
        zombie.pos.x,
        zombie.pos.y,
        bullet.vector.x,
        bullet.vector.y
      );
      if (d < 20) {
        score++;
        bullets.splice(bullets.indexOf(bullet), 1);
        zombies.splice(zombies.indexOf(zombie), 1);
      }
    });
  });
}

// Steup for pause
function pauseGame(event) {
  if (event.key === "p") {
    isPause = !isPause;
  }
  console.log(isPause);
}

///////////////////awwawwda
// New Frame Logic
///////////////////
// Updates each animation frame
function update() {
  if (isPause) {
    return;
  }
  scoreElement.innerHTML = `<h1>SCORE: ${score}</h1>`;
  roundElement.innerHTML = `<h4>ROUND: ${round}</h4>`;
  if (gameEnd) {
    main.innerHTML = `<h1>GAME OVER!</h1> <h1>SCORE: ${score}</h1><a href="startup.html" id="restart">Restart?</a>`;
    let restart = document.getElementById("restart");
    restart.style.textDecoration = "none";
    restart.style.color = "yellow";
    restart.style.fontSize = "25px";
    main.style = "padding:200px;";
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //refreshes canvas
    player.update();
    player.create(ctx);
    bullets.forEach((bullet) => {
      bullet.update(bullets);
      bullet.render(ctx);
    });
    zombies.forEach((zombie) => {
      zombie.update(player, zombies);
      zombie.create(ctx);
    });
    player.update();
    player.create(ctx);
    bullets.forEach((bullet) => {
      zombies.forEach((zombie) => {
        let d = distance(
          zombie.pos.x,
          zombie.pos.y,
          bullet.vector.x,
          bullet.vector.y
        );
        if (d < 20) {
          score += round;
          bullets.splice(bullets.indexOf(bullet), 1);
          zombies.splice(zombies.indexOf(zombie), 1);
        }
      });
    });
    zombies.forEach((zombie) => {
      let d = distance(zombie.pos.x, zombie.pos.y, player.pos.x, player.pos.y);
      if (d < 30) {
        gameEnd = true;
      }
    });
  }
}

if (!gameEnd) {
  animate(update);
}
function newRound() {
  round++;
}

///////////////
// Exports
///////////////
// export {
//   keyMap,
//   bullets,
//   zombies
//