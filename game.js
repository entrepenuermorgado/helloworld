const mario = document.getElementById("mario");

let velocityY = 0;
let gravity = 1.5;
let isJumping = false;

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowRight") {
    mario.style.left = parseInt(mario.style.left) + 10 + "px";
    mario.style.transform = "scaleX(1)";
  }

  if (e.code === "ArrowLeft") {
    mario.style.left = parseInt(mario.style.left) - 10 + "px";
    mario.style.transform = "scaleX(-1)";
  }

  if (e.code === "Space" || e.code === "ArrowUp") {
    if (!isJumping) {
      velocityY = -20;
      isJumping = true;
    }
  }
});

function update() {
  let bottom = parseInt(mario.style.bottom) || 100;
  velocityY += gravity;
  bottom -= velocityY;

  if (bottom <= 100) {
    bottom = 100;
    isJumping = false;
    velocityY = 0;
  }

  mario.style.bottom = bottom + "px";

  requestAnimationFrame(update);
}

update();
