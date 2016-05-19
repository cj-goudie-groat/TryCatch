var selected = false; // Whether or not the gamemode button is selected

/**
 * Sets the gamemode to play.
 */
function selectGamemode(id) {
  if (selected == false) {
    document.getElementById(id).className = "theme-selected";
    selected = true;
  } else {
    document.getElementById(id).className = "theme";
    selected = false;
  }
  
  if (id == "spelling-button") {
    gamemode = "spelling";
  }
}