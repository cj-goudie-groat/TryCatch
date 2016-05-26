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
    document.getElementById("gametype").innerHTML = "spelling";
    $(".spelling-tutorial").attr("src", "images/tutorial/spellingtutorial.jpg");
    $(".spelling-tutorial").css({display: "block"});
    $(".math-tutorial").css({display: "none"});
    $(".how-to-play").html("How to play - Spelling");
  } else if (id == "math-button") {
    gamemode = "math";
    document.getElementById("gametype").innerHTML = "math";
    $(".math-tutorial").attr("src", "images/tutorial/mathtutorial.jpg");
    $(".math-tutorial").css({display: "block"});
    $(".spelling-tutorial").css({display: "none"});
    $(".how-to-play").html("How to play - Math");
  }
}