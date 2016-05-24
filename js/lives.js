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

/**
 * Adds a life and updates the heart sprites if the current lives
 * are less than 5.
 */
function addLife() {
  if (currentLives < 5) {
    lifeSound.play();
    currentLives++;
    updateLives();
  }
}

/**
 * Removes a life and updates the heart sprites.
 * If the lives run out, gameOver() is called.
 */
function loseLife() {
  currentLives--;
  updateLives();
  
  if (currentLives != 0) {
    wrongElementSound.play();
  } else {
    gameOver();
  }
}