$(document).ready(function () {
  $(".available").click(function () {
    selectGamemode(this.id);
  });
});

/**
 * Sets the gamemode to play.
 */
function selectGamemode(id) {
  var themes = document.getElementsByClassName("theme-selected");
  
  while (themes.length) {
    themes[0].className = "theme";
  }
  
  document.getElementById(id).className = "theme-selected";
  
  if (id == "spelling-button") {
    gamemode = "spelling";
  } else if (id == "math-button") {
    gamemode = "math";
  }
}