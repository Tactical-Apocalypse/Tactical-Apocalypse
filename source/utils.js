///////////////
// Imports
///////////////
import assets from './assets/*.png';


/////////////////////
// Utility Variables
/////////////////////
let loaded = 0;
const images = ['tank2'];

/////////////////////
// Utility Functions
/////////////////////
// Returns a random number between the 'min' and 'max' arguments, inclusive
function random (min, max) {
    return (Math.random() * (max - min)) + min;
};

// Returns the distance between two points using the distance formula => d=√((x2 – x1)² + (y2 – y1)²)
function distance (x1, y1, x2, y2) {
    let xx = Math.pow((x2 - x1), 2);
    let yy = Math.pow((y2 - y1), 2);
    return Math.sqrt(xx + yy);
};

///////////////
// Image Load
///////////////
// for (const image of images) {
//     const image = new Image();
//     image.onload = function () {}
// }

///////////////
// Exports
///////////////
export default {
  random,
  distance
}