const mario = document.getElementById("mario");
const goomba = document.getElementById("goomba");
const platforms = document.querySelectorAll(".platform");

let marioX = 50;
let marioY = 100;
let velocityY = 0;
let gravity = 1.5;
let isJumping = false;
let gameOver = false;

let goombaX = 500;
let goombaDirection = -1;

document.addEventListener("keydown", (e) => {
  if (gameOver) return;

  if (e.code === "ArrowRight") {
    marioX += 10;
    mario.style.transform = "scaleX(1)";
  } else if (e.code === "ArrowLeft") {
    marioX -= 10;
    mario.style.transform = "scaleX(-1)";
  } else if ((e.code === "Space" || e.code === "ArrowUp") && !isJumping) {
    velocityY = -20;
    isJumping = true;
  }

  mario.style.left = marioX + "px";
});

function update() {
  if (gameOver) return;

  velocityY += gravity;
  marioY -= velocityY;

  // Floor
  if (marioY <= 100) {
    marioY = 100;
    velocityY = 0;
    isJumping = false;
  }

  // Platform collision
  const marioRect = mario.getBoundingClientRect();
  platforms.forEach((platform) => {
    const platRect = platform.getBoundingClientRect();

    const standingOnTop =
      marioRect.bottom >= platRect.top &&
      marioRect.bottom <= platRect.top + 20 &&
      marioRect.right >= platRect.left &&
      marioRect.left <= platRect.right &&
      velocityY <= 0;

    if (standingOnTop) {
      marioY = window.innerHeight - platRect.top;
      velocityY = 0;
      isJumping = false;
    }
  });

  mario.style.bottom = marioY + "px";

  // Move goomba
  goombaX += goombaDirection * 2;
  if (goombaX < 400 || goombaX > 600) {
    goombaDirection *= -1;
  }
  goomba.style.left = goombaX + "px";

  // Collision Mario vs Goomba
  const goombaRect = goomba.getBoundingClientRect();
  if (
    marioRect.left < goombaRect.right &&
    marioRect.right > goombaRect.left &&
    marioRect.bottom > goombaRect.top &&
    marioRect.top < goombaRect.bottom
  ) {
    document.body.innerHTML = `<h1 style="color:red;text-align:center;margin-top:20%;">💀 Game Over 💀</h1>`;
    gameOver = true;
    return;
  }

  requestAnimationFrame(update);
}

update();
