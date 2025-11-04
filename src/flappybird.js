// board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

// physics
let velocity = 0;
let gravity = 0.5;
let jumpStrength = -8;

// game state
let gameState = "RUNNING";

window.onload = function () {
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");

  birdImg = new Image();
  birdImg.src = "flappybird.png";

  birdImg.onload = function () {
    requestAnimationFrame(update);
  };

  window.addEventListener("keydown", function (e) {
    if (e.code === "Space" && gameState === "RUNNING") {
      velocity = jumpStrength;
    }
    if (e.code === "KeyR" && gameState === "GAME_OVER") {
      restartGame();
    }
  });

  window.addEventListener("click", function () {
    if (gameState === "GAME_OVER") {
      restartGame();
    }
  });
};

function drawScene() {
  context.clearRect(0, 0, board.width, board.height);

  // background
  context.fillStyle = "#70c5ce";
  context.fillRect(0, 0, boardWidth, boardHeight);

  // bird
  context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);

  if (gameState === "GAME_OVER") {
    context.fillStyle = "red";
    context.font = "32px Arial";
    context.fillText("GAME OVER", 80, boardHeight / 2);
    context.font = "20px Arial";
    context.fillText("Press R or Click to Restart", 50, boardHeight / 2 + 40);
  }
}

function update() {
  if (gameState === "RUNNING") {
    velocity += gravity;
    birdY += velocity;

    if (birdY + birdHeight >= boardHeight) {
      birdY = boardHeight - birdHeight;
      gameState = "GAME_OVER";
    } else if (birdY <= 0) {
      birdY = 0;
      gameState = "GAME_OVER";
    }
  }

  drawScene();
  requestAnimationFrame(update);
}

function restartGame() {
  birdY = boardHeight / 2;
  velocity = 0;
  gameState = "RUNNING";
}
