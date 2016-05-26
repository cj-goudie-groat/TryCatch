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
    
    if (window.innerWidth >= 550) {
      elementSpeed = 5;
      elementAmount = 10;
    } else {
      elementSpeed = 4;
      elementAmount = 7;
    }
  } else if (id == "hard") { // Hard
    difficulty = 3;
    scoreMult = 1;
    
    if (window.innerWidth >= 550) {
      elementSpeed = 9;
      elementAmount = 15;
    } else {
      elementSpeed = 7;
      elementAmount = 12;
    }
  } else { // Medium (default)
    difficulty = 2;
    scoreMult = 0.75;
    
    if (window.innerWidth >= 550) {
      elementSpeed = 7;
      elementAmount = 13;
    } else {
      elementSpeed = 5;
      elementAmount = 10;
    }
  }
  
  // Changes the buttons selected class to the currently selected button
  var difficulties = document.getElementsByClassName("button-selected");
  
  while (difficulties.length) {
    difficulties[0].className = "button";
  }
  
  document.getElementById(id).className = "button-selected";
}