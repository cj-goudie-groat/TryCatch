$(document).ready(function () {
  /**
   * Brings the difficulty menu up.
   */
  $("#difficulty-button").click(function() {
    $("#difficulty-menu").css({display: "block"});
  });
  
  /**
   * Calls the goToLeaderBoard() function.
   */
  $(".leaderboard-button").click(function () {
    goToLeaderboard()
  });
  
  /**
   * Calls the goToMainMenu() function.
   */
  $(".main-menu-button").click(function () {
    goToMainMenu()
  });
});

/**
 * Loads to the main menu page.
 */
function goToMainMenu() {
  canPause = false;
  document.location.href = 'index.html';
}

/**
 * Loads to the leaderboard page.
 */
function goToLeaderboard() {
  canPause = false;
  document.location.href = 'leaderboard.html';
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