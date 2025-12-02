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

let velocity = 0;
let gravity = 0.4;
let jumpStrength = -8;

// pipes
let pipeWidth = 64;
let pipeGap = 150;
let pipeArray = [];
let pipeSpeed = -2;

// images
let backgroundImg;
let topPipeImg;
let bottomPipeImg;

// game state
let gameState = "RUNNING";
let score = 0;

window.onload = function () {
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");

  backgroundImg = new Image();
  backgroundImg.src = "flappybirdbg.png";

  birdImg = new Image();
  birdImg.src = "flappybird.png";

  topPipeImg = new Image();
  topPipeImg.src = "toppipe.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "bottompipe.png";

  bottomPipeImg.onload = function () {
    requestAnimationFrame(update);
  };

  window.addEventListener("keydown", handleInput);
};

function handleInput(e) {
  if (e.code === "Space" && gameState === "RUNNING") {
    velocity = jumpStrength;
  }

  if (e.code === "KeyR" && gameState === "GAME_OVER") {
    resetGame();
  }
}

function update() {
  requestAnimationFrame(update);

  if (gameState !== "RUNNING") {
    drawScene();
    drawGameOver();
    return;
  }

  // BIRD PHYSICS
  velocity += gravity;
  birdY += velocity;

  if (birdY + birdHeight >= boardHeight) {
    birdY = boardHeight - birdHeight;
    gameState = "GAME_OVER";
  }

  if (birdY <= 0) {
    birdY = 0;
    velocity = 0;
  }

  // PIPES
  for (let i = 0; i < pipeArray.length; i++) {
    pipeArray[i].x += pipeSpeed;

    // collision
    if (isColliding(pipeArray[i])) {
      gameState = "GAME_OVER";
    }

    // score
    if (!pipeArray[i].passed && pipeArray[i].x + pipeWidth < birdX) {
      score++;
      pipeArray[i].passed = true;
    }
  }

  // Remove off-screen pipes
  pipeArray = pipeArray.filter((p) => p.x + pipeWidth > 0);

  // Add new pipes
  if (
    pipeArray.length === 0 ||
    pipeArray[pipeArray.length - 1].x < boardWidth - 200
  ) {
    addPipePair();
  }

  drawScene();
}

function drawScene() {
  context.clearRect(0, 0, boardWidth, boardHeight);
  context.drawImage(backgroundImg, 0, 0, boardWidth, boardHeight);

  // draw pipes
  for (let pipe of pipeArray) {
    context.drawImage(topPipeImg, pipe.x, pipe.y, pipeWidth, pipe.topHeight);
    context.drawImage(
      bottomPipeImg,
      pipe.x,
      pipe.y + pipe.topHeight + pipeGap,
      pipeWidth,
      pipe.bottomHeight
    );
  }

  // draw bird
  context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);

  // score
  context.fillStyle = "white";
  context.font = "32px Arial";
  context.fillText(score, 20, 50);
}

function addPipePair() {
  let topHeight =
    Math.floor(Math.random() * (boardHeight - pipeGap - 100)) + 50;
  let bottomHeight = boardHeight - pipeGap - topHeight;

  pipeArray.push({
    x: boardWidth,
    y: 0,
    topHeight: topHeight,
    bottomHeight: bottomHeight,
    passed: false,
  });
}

function isColliding(pipe) {
  let inX = birdX + birdWidth > pipe.x && birdX < pipe.x + pipeWidth;
  if (!inX) return false;

  let hitTop = birdY < pipe.topHeight;
  let hitBottom = birdY + birdHeight > pipe.topHeight + pipeGap;

  return hitTop || hitBottom;
}

function drawGameOver() {
  context.fillStyle = "white";
  context.font = "36px Arial";
  context.fillText("GAME OVER", 70, 300);

  context.font = "20px Arial";
  context.fillText("Press R to Restart", 95, 340);
}

function resetGame() {
  birdY = boardHeight / 2;
  velocity = 0;
  pipeArray = [];
  score = 0;
  gameState = "RUNNING";
}
