/**
 * Checks if a trophy is unlocked.
 */
function unlockTrophy() {
  var unlock = false;
  
  if (currentScore > 100) {
    localStorage.setItem("100Trophy", "Achieved!");
    unlock = true;
  }
  
  if (currentScore > 500) {
    localStorage.setItem("500Trophy", "Achieved!");
    unlock = true;
  }
  
  if (currentScore > 1000) {
    localStorage.setItem("1000Trophy", "Achieved!");
    unlock = true;
  }
  
  if (unlock) {
    achievementSound.play();
  }
}

/**
 * Unlocks the trophy if it is achieved.
 */
function unlockCheck() {

  if (localStorage.getItem("100Trophy") == "Achieved!") {
    document.getElementById("unlock100").src = "images/100trophy.png";
  }

  if (localStorage.getItem("500Trophy") == "Achieved!") {
    document.getElementById("unlock500").src = "images/100trophy.png";
  }

  if (localStorage.getItem("1000Trophy") == "Achieved!") {
    document.getElementById("unlock1000").src = "images/100trophy.png";
  }
}