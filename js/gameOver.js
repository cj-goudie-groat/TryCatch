$(document).ready(function () {
  /**
   * Calls the retryGame() function when the retry button is pressed.
   */
  $("#retry-button").click(function () {
    retryGame();
  });
});

/**
 * Ends the game, displays game over menu, and your final score.
 */
function gameOver() {
  paused = true;
  
  // Plays game over sound
  gameOverSound.play();
  
  // Checks the gamemode and stops the music
  if (gamemode == "spelling") {
    spellingMusic.loop(false);
    spellingMusic.fadeOut(0, 1000);
  } else if (gamemode == "math") {
    mathMusic.loop(false);
    mathMusic.fadeOut(0, 1000);
  }
  
  // Displays final score and screen darkem background effect
  canPause = false;
  document.getElementById("game-over").style.display = "block";
  document.getElementById("pause-menu-screen-darken").style.display = "block";
  document.getElementById("score").innerHTML = "Your final score was: " + currentScore;
  document.getElementById("final-score").value =  currentScore;
  unlockCheck();
  unlockTrophy();
}

/**
 * Restarts the game
 */
function retryGame() {
  if (gamemode == "spelling") {
    // Clear and redraw a new word
    clearWord();
    drawWord();
    letterCount = 0;
    
    // Replays the spelling music
    spellingMusic.loop(true);
    spellingMusic.fadeIn(1, 2000);
  } else if (gamemode == "math") {
    // Clear and redraw a new equation
    clearEquation();
    drawEquation();
    currentIndex = 0;
    
    // Replays the math music
    mathMusic.loop(true);
    mathMusic.fadeIn(1, 2000);
  }
  
  // Reset element positions
  for (var i = 0; i < elementAmount; i++) {
    newElement(i);
  }
  
  // Reset special item positions
  specialSpawned = false;
  specialSpawnTimer = Math.floor(Math.random() * 30000) + 60000; // Spawn 60 - 90 seconds after retry
    setTimeout(function () {
      specialSpawned = true;
      newSpecialItem();
    }, specialSpawnTimer);
  
  // Reset lives and score
  currentLives = 5;
  currentScore = 0;
  document.getElementById("score-counter").innerHTML = "" + currentScore;
  updateLives();
  
  game.elementContext.clearRect(0, 0, game.elementCanvas.width, game.elementCanvas.height);9
  
  //Resumes the game
  document.getElementById("game-over").style.display = "none";
  canPause = true;
  resume();
}