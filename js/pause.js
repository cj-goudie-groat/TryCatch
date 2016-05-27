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
  if (bonusActive) {
    bonusTimer.pause();
  }
  document.getElementById("pause-menu").style.display = "block";
    $("#pause-menu-screen-darken").css({display: "block", opacity: ".5"});
}

/**
 * Resumes the game.
 */
function resume() {
  if (!canPause) {
    return;
  }
  
  paused = false;
  if (bonusActive) {
    bonusTimer.resume();
  }
  document.getElementById("pause-menu").style.display = "none";
    $("#pause-menu-screen-darken").css({display: "none"});
}