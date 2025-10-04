//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34; //width/height ratio = 408/228 = 17/12
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

//pipes
let pipeWidth = 64;
let pipeHeight = 200;
let pipeX = boardWidth - 100;
let pipeY = 0;
let gap = 150;

let topPipeImg;
let bottomPipeImg;

let backgroundImg;

window.onload = function () {
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");

  //load images
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

  // Top pipe
  context.drawImage(topPipeImg, pipeX, 0, pipeWidth, pipeHeight);

  // Bottom pipe
  let bottomPipeY = pipeHeight + gap;
  context.drawImage(bottomPipeImg, pipeX, bottomPipeY, pipeWidth, pipeHeight);
}
