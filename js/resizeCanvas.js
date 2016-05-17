var bg = document.getElementById("background");
var player = document.getElementById("ship");
var playerCtx = player.getContext("2d");
var elements = document.getElementById("elements");

var tempPlayer = document.createElement("canvas");
var tempPlayerCtx = tempPlayer.getContext("2d");

var wrapper = document.getElementById("wrapper");

function resizeCanvas() {
  // Resize background and elements canvas
  bg.width = wrapper.clientWidth;
  bg.height = wrapper.clientHeight;
  elements.width = wrapper.clientWidth;
  elements.height = wrapper.clientHeight;
  
  // Resize player canvas and redraw player sprite
  tempPlayer.width = player.width;
  tempPlayerCtx.drawImage(player, 0, 0);
  player.width = wrapper.clientWidth;
  playerCtx.drawImage(tempPlayer, 0, 0);
}
resizeCanvas();

window.addEventListener("resize", resizeCanvas, false);