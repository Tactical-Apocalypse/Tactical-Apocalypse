///////////////
// Imports
///////////////


/////////////////////
// Functions
/////////////////////
// Returns a random number between the 'min' and 'max' arguments, inclusive
export function random (min, max) {
    return (Math.random() * (max - min)) + min;
};

// Returns the distance between two points using the distance formula => d=√((x2 – x1)² + (y2 – y1)²)
export function distance (x1, y1, x2, y2) {
    let xx = Math.pow((x2 - x1), 2);
    let yy = Math.pow((y2 - y1), 2);
    return Math.sqrt(xx + yy);
};
