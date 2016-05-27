/**
 * Checks if a trophy is unlocked.
 */
function unlockTrophy() {
  if (currentScore > 1000 && localStorage.getItem("1000Trophy") != "Achieved!") {
    localStorage.setItem("1000Trophy", "Achieved!");
    achievementSound.play();
  }
  
  if (currentScore > 5000 && localStorage.getItem("5000Trophy") != "Achieved!") {
    localStorage.setItem("5000Trophy", "Achieved!");
    achievementSound.play();
  }
  
  if (currentScore > 10000 && localStorage.getItem("10000Trophy") != "Achieved!") {
    localStorage.setItem("10000Trophy", "Achieved!");
    achievementSound.play();
  }

  if (eggCount >= 5 && localStorage.getItem("eggTrophy") != "Achieved!") {
    localStorage.setItem("eggTrophy", "Achieved!");
    achievementSound.play();
  }
}

/**
 * Unlocks the trophy if it is achieved.
 */
function unlockCheck() {

  if (localStorage.getItem("1000Trophy") == "Achieved!") {
    document.getElementById("unlock1000").src = "images/1000trophy.png";
  }

  if (localStorage.getItem("5000Trophy") == "Achieved!") {
    document.getElementById("unlock5000").src = "images/5000trophy.png";
  }

  if (localStorage.getItem("10000Trophy") == "Achieved!") {
    document.getElementById("unlock10000").src = "images/10000trophy.png";
  }

  if (localStorage.getItem("eggTrophy") == "Achieved!") {
    document.getElementById("unlockEgg").src = "images/eggtrophy.png";
  }
}