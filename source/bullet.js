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

///////////
// Exports
///////////
export default Bullet;
