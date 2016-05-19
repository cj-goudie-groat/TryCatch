$(document).ready(function () {
  /**
   * Calls setDifficulty() when a difficulty is selected.
   */
  $("#easy").click(function () {
    setDifficulty(1)
  });
  $("#medium").click(function () {
    setDifficulty(2)
  });
  $("#hard").click(function () {
    setDifficulty(3)
  });
});

var selectEasy = false; // Whether easy is selected or not
var selectMedium = true; // Whether medium is selected or not
var selectHard = false; // Whether hard is selected or not

/**
 * Sets the difficulty of the game, which determines
 * the speed and amount of falling elements, and
 * the score multiplier.
 */
function setDifficulty(diff) {
  if (diff == 1) { // Easy
    difficulty = 1;
    scoreMult = 0.5;
    elementSpeed = 4;
    elementAmount = 10;

    if (selectEasy == false) {
      document.getElementById("easy").className = "button-selected";
      document.getElementById("medium").className = "button";
      document.getElementById("hard").className = "button";
      selectEasy = true;
      selectMedium = false;
      selectHard = false;
    } else {
      document.getElementById("easy").className = "button";
      document.getElementById("medium").className = "button";
      document.getElementById("hard").className = "button";
      selectEasy = false;
      selectMedium = false;
      selectHard = false;
    }
  } else if (diff == 3) { // Hard
    difficulty = 3;
    scoreMult = 1;
    elementSpeed = 10;
    elementAmount = 30;

    if (selectHard == false) {
      document.getElementById("easy").className = "button";
      document.getElementById("medium").className = "button";
      document.getElementById("hard").className = "button-selected";
      selectEasy = false;
      selectMedium = false;
      selectHard = true;
    } else {
      document.getElementById("easy").className = "button";
      document.getElementById("medium").className = "button";
      document.getElementById("hard").className = "button";
      selectEasy = false;
      selectMedium = false;
      selectHard = false;
    }
  } else { // Medium (default)
    difficulty = 2;
    scoreMult = 0.75;
    elementSpeed = 7;
    elementAmount = 20;
    
    if (selectMedium == false) {
      document.getElementById("easy").className = "button";
      document.getElementById("medium").className = "button-selected";
      document.getElementById("hard").className = "button";
      selectEasy = false;
      selectMedium = true;
      selectHard = false;
    } else {
      document.getElementById("easy").className = "button";
      document.getElementById("medium").className = "button";
      document.getElementById("hard").className = "button";
      selectEasy = false;
      selectMedium = false;
      selectHard = false;
    }
  }
  $("#difficulty-menu").fadeOut(1000);
}