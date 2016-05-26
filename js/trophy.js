/**
 * Checks if a trophy is unlocked.
 */
function unlockTrophy() {
  if (currentScore > 100 && localStorage.getItem("100Trophy") != "Achieved!") {
    localStorage.setItem("100Trophy", "Achieved!");
    achievementSound.play();
  }
  
  if (currentScore > 500 && localStorage.getItem("500Trophy") != "Achieved!") {
    localStorage.setItem("500Trophy", "Achieved!");
    achievementSound.play();
  }
  
  if (currentScore > 1000 && localStorage.getItem("1000Trophy") != "Achieved!") {
    localStorage.setItem("1000Trophy", "Achieved!");
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