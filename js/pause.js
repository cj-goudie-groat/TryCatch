$(document).ready(function () {
  /**
   * Calls the pause() function when the pause button is pressed.
   */
  $("#menu-pause").click(function () {
    pause()
  });
  
  /**
   * Calls the resume() function when the pause button is pressed.
   */
  $("#resume-button").click(function () {
    resume()
  });
});

/**
 * Pauses the game.
 */
function pause() {
  if (!canPause) {
    return;
  }
  
  paused = true;
  document.getElementById("pause-menu").style.display = "block";
  document.getElementById("pause-menu-screen-darken").style.display = "block";
}

/**
 * Resumes the game.
 */
function resume() {
  if (!canPause) {
    return;
  }
  
  paused = false;
  document.getElementById("pause-menu").style.display = "none";
  document.getElementById("pause-menu-screen-darken").style.display = "none";
}