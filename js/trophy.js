/**
 * Checks if a trophy is unlocked.
 */
function unlockCheck() {
  if (currentScore > 100) {
    localStorage.setItem("100Trophy", "Achieved!");
  }

  if (currentScore > 200) {
    localStorage.setItem('500Trophy', 'Achieved!');
  }
  
  if (currentScore > 300) {
    localStorage.setItem('1000Trophy', 'Achieved!');
  }
}z

/**
 * Unlocks the trophy if it is unlocked.
 */
function unlockTrophy() {

  if (localStorage.getItem("100Trophy") == 'Achieved!') {
    document.getElementById("unlock100").src = "100trophy.png";
  }

  if (localStorage.getItem("500Trophy") == 'Achieved!') {
    document.getElementById("unlock100").src = "100trophy.png";

  }

  if (localStorage.getItem("1000Trophy") == 'Achieved!') {
    document.getElementById("unlock100").src = "100trophy.png";
  }
}