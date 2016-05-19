/**
 * Updates lives indication.
 */
function updateLives() {
  if (currentLives == 5) {
    document.getElementById("heart1").style.visibility = "visible";
    document.getElementById("heart2").style.visibility = "visible";
    document.getElementById("heart3").style.visibility = "visible";
    document.getElementById("heart4").style.visibility = "visible";
    document.getElementById("heart5").style.visibility = "visible";
  } else if (currentLives == 4) {
    document.getElementById("heart2").style.visibility = "visible";
    document.getElementById("heart1").style.visibility = "hidden";
  } else if (currentLives == 3) {
    document.getElementById("heart3").style.visibility = "visible";
    document.getElementById("heart2").style.visibility = "hidden";
  } else if (currentLives == 2) {
    document.getElementById("heart4").style.visibility = "visible";
    document.getElementById("heart3").style.visibility = "hidden";
  } else if (currentLives == 1) {
    document.getElementById("heart5").style.visibility = "visible";
    document.getElementById("heart4").style.visibility = "hidden";
  } else if (currentLives == 0) {
    document.getElementById("heart5").style.visibility = "hidden";
  }
}