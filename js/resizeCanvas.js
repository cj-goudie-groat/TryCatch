var bg = document.getElementById('background');
var player = document.getElementById('ship');

window.addEventListener('resize', resizeCanvas, false);

var tempPlayer = document.createElement('canvas');
var tempPlayerCtx = tempPlayer.getContext('2d');

function resizeCanvas() {
  bg.height = window.innerHeight;
  tempPlayer.width = player.width;
  tempPlayer.height = window.innerHeight;
  tempPlayer.drawImage(player, 0, 0);
  tempPlayerCtx.drawImage(tempPlayer, 0, 0);
}
resizeCanvas();