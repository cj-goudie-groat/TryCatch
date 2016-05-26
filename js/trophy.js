/**
 * Checks if a trophy is unlocked.
 */
function unlockCheck() {
  if (currentScore > 100) {
    localStorage.setItem("100Trophy", "Achieved!");
  } else {
    break;
  }

  if (currentScore > 200) {
    localStorage.setItem('500Trophy', 'Achieved!');
  } else {
    break;
  }
  
  if (currentScore > 300) {
    localStorage.setItem('1000Trophy', 'Achieved!');
  } else {
    break;
  }
}

/**
 * Unlocks the trophy if it is unlocked.
 */
function unlockTrophy() {

  if (localStorage.getItem("100Trophy") === "Achieved!") {
    document.getElementById("unlock100").src = "100trophy.png";
  }

  if (localStorage.getItem("500Trophy") === "Achieved!") {
    var image = document.getElementById('unlock500');
    if (image.src.match("images/lock.png")) {
        image.src = "images/500trophy.png";
    }
  }

  if (localStorage.getItem("1000Trophy") === "Achieved!") {
    var image = document.getElementById('unlock1000');
    if (image.src.match("images/lock.png")) {
        image.src = "images/1000trophy.png";
    }
  }
}