///////////////
// Imports
///////////////
import animate from "./animations.js";
import Player from "./characters.js"


////////////////
// DOM Elements
////////////////
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');


//////////////
// Variables
//////////////
// let player = new Player ();
// let width = canvas.offsetLeft + (canvas.offsetWidth / 2);
// let height = canvas.offsetTop + (canvas.offsetHeight / 2);


//////////////
// Functions
//////////////
const player = new Player();
function update () {
    player.update();
    player.create(ctx);
    console.log('update');
}

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
    ctx
}