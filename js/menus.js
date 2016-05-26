$(document).ready(function () {  
  /**
   * Brings the difficulty menu up.
   */
  $("#difficulty-button").click(function() {
    $("#difficulty-menu").css({display: "block"});
    $("#pause-menu-screen-darken").css({opacity: "0.01", display: "block"});
  });
  /**
   * Brings the leaderboard menu up.
   */
  $(".leaderboard-button").click(function() {
    $("#leaderboard").css({display: "block"});
    $("#achievement-screen").css({display: "none"});
    $("#pause-menu-screen-darken").css({opacity: "0.01", display: "block"});
  });
  
  /**
   * Removes the overlayed screen and screen darkening
   */
  $(".main-menu-button").click(function () {
    $("#leaderboard").css({display: "none"});
    $("#tutorial-screen").css({display: "none"});
    $("#achievement-screen").css({display: "none"});
    $("#pause-menu-screen-darken").css({display: "none"});
    $("#difficulty-menu").css({display: "none"});
  });
  
  /**
   * Brings the tutorial screen up.
   */
  $(".tutorial-button").click(function() {
    $("#tutorial-screen").css({display: "block"});
  });
  
  /**
   * Removes overlayed tutorial screen.
   */
  $(".close-tutorial").click(function() {
    $("#tutorial-screen").css({display: "none"});
  });
  
  /**
   * Brings the achievement screen up.
   */
  $("#achievement-button").click(function() {
    $("#achievement-screen").css({display: "block"});
    $("#pause-menu-screen-darken").css({opacity: "0.01", display: "block"});
  });
  
  /**
   * Switches leaderboards on click
   */
  $(".next-board").click(function () {
    switchBoards();
  });
  
  /**
   * Switches leaderboards on click
   */
  $(".previous-board").click(function () {
    switchBoards();
  });
  
  /**
   * Calls the goToMainMenu() function.
   */
  $(".main-menu").click(function () {
    goToMainMenu();
  });
  
  // Check if there are trophies unlocked
  unlockCheck();
});

/**
 * Loads to the main menu page.
 */
function goToMainMenu() {
  buttonSound.play();
  canPause = false;
  document.location.href = 'index.html';
}

var spellingLeaderboard = true; // Start at the spelling leaderboard

/**
 * Switches the leaderboard to different gamemode leaderboards
 */
function switchBoards() {
  if (spellingLeaderboard) {
    $("#math-scores").css({display: "block"});
    $("#spelling-scores").css({display: "none"});
    $("#leaderboard-header").html("Leaderboard - Math");
  } else {
    $("#spelling-scores").css({display: "block"});
    $("#math-scores").css({display: "none"});
    $("#leaderboard-header").html("Leaderboard - Spelling");
  }
    spellingLeaderboard = !spellingLeaderboard;
}