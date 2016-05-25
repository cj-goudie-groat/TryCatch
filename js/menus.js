$(document).ready(function () {
  /**
   * Brings the difficulty menu up.
   */
  $("#difficulty-button").click(function() {
    $("#difficulty-menu").css({display: "block"});
    $("#pause-menu-screen-darken").css({display: "block"});
  });
  /**
   * Brings the leaderboard menu up.
   */
  $(".leaderboard-button").click(function() {
    $("#leaderboard").css({display: "block"});
    $("#pause-menu-screen-darken").fadeIn(1000);
  });
  
  /**
   * Calls the goToMainMenu() function.
   */
  $(".main-menu-button").click(function () {
    $("#leaderboard").fadeOut(1000);
    $("#pause-menu-screen-darken").fadeOut(1000);
  });
  /**
   * Calls the goToMainMenu() function.
   */
  $(".main-menu").click(function () {
    goToMainMenu();
  });
});

/**
 * Loads to the main menu page.
 */
function goToMainMenu() {
  buttonSound.play();
  canPause = false;
  document.location.href = 'index.html';
}

var selected = false;

function selectButton(id) {
  if (selected == false) {
    document.getElementById(id).className = "theme-selected";
    selected = true;
  } else {
    document.getElementById(id).className = "theme";
    selected = false;
  }
}