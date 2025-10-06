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

// pipes
let pipeWidth = 64;
let pipeHeight = 200;
let gap = 150;
let topPipeX = boardWidth - 120;
let topPipeY = 0;
let bottomPipeY = pipeHeight + gap;

// images
let backgroundImg;
let topPipeImg;
let bottomPipeImg;

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
    drawScene();
  };
};

function drawScene() {
  // Background
  context.drawImage(backgroundImg, 0, 0, boardWidth, boardHeight);

  // Bird
  context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);

  // Top Pipe
  context.drawImage(topPipeImg, topPipeX, topPipeY, pipeWidth, pipeHeight);

  // Bottom Pipe
  context.drawImage(
    bottomPipeImg,
    topPipeX,
    bottomPipeY,
    pipeWidth,
    pipeHeight
  );
}
