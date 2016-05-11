var bg = document.getElementById("background");
var player = document.getElementById("ship");
var elements = document.getElementById("elements");
window.addEventListener("resize", resizeCanvas, false);

var tempPlayer = document.createElement("canvas");
var tempPlayerCtx = tempPlayer.getContext("2d");

function resizeCanvas() {
  bg.height = window.innerHeight;
  elements.height = window.innerHeight;
  tempPlayer.height = window.innerHeight;
  tempPlayerCtx.drawImage(tempPlayer, 0, 0);
}
resizeCanvas();