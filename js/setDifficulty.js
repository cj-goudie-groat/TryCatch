$(document).ready(function () {
  /**
   * Calls setDifficulty() when a difficulty is selected.
   */
  $(".diff").click(function () {
    setDifficulty(this.id);
  });
});

/**
 * Sets the difficulty of the game, which determines
 * the speed and amount of falling elements, and
 * the score multiplier.
 */
function setDifficulty(id) {
  if (id == "easy") { // Easy
    difficulty = 1;
    scoreMult = 0.5;
    
    if (window.innerWidth > 1000) {
      elementSpeed = 5;
      elementAmount = 10;
    } else {
      elementSpeed = 5;
      elementAmount = 5;
    }
  } else if (id == "hard") { // Hard
    difficulty = 3;
    scoreMult = 1;
    
    if (window.innerWidth > 1000) {
      elementSpeed = 8;
      elementAmount = 15;
    } else {
      elementSpeed = 6;
      elementAmount = 10;
    }
  } else { // Medium (default)
    difficulty = 2;
    scoreMult = 0.75;
    
    if (window.innerWidth > 1000) {
      elementSpeed = 6;
      elementAmount = 13;
    } else {
      elementSpeed = 4;
      elementAmount = 7;
    }
  }
  var difficulties = document.getElementsByClassName("button-selected");
  
  while (difficulties.length) {
    difficulties[0].className = "button";
  }
  
  document.getElementById(id).className = "button-selected";
  
  $("#difficulty-menu").fadeOut(1000);
  $("#pause-menu-screen-darken").fadeOut(1000);
}