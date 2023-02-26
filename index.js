// ////////////////////////
// // Variables
// ////////////////////////

// // const player = document.getElementById("player");
// // console.log(player);

// ////////////////////////
// // Initial Setup
// ////////////////////////

// const playerObj = {
//   x: player.offsetWidth,
//   y: player.offsetHeight,
// };

// ////////////////////////
// // New Frame Logic
// ////////////////////////

// ////////////////////////
// // Event Handlers
// ////////////////////////

// gameBoard.addEventListener("onmouseover", movePlayer);

// ////////////////////////
// // Functions
// ////////////////////////

// function movePlayer(e) {}

import animate from "./source/animations.js"
import Bullet from "./source/bullet.js"

const bullets = []

document.body.addEventListener("click", () => {
  bullets.push(
    new Bullet(player.vector.x, player.vector.y, player.angle)
  )
  console.log(bullets);
})

const update = () => {
  bullets.forEach(bullet => {
    bullet.update(bullets)
    bullet.render(ctx)
  })
}

animate(update);