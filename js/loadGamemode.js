$(document).ready(function () {
  /**
   * Calls loadGamemode() when the start button is clicked.
   */
  $("#start-button").click(function () {
    $("#main-menu").fadeOut(1000);
    $("#game").fadeIn(2000);
    $("#difficulty-menu").fadeOut(1000);
    $("#pause-menu-screen-darken").css({display: "none"});
    // $("#space-bg").fadeIn(1000);
    loadGamemode();
  });
});

/**
 * Loads the selected gamemode to play and starts
 * the animation loop.
 */
function loadGamemode() {
  canPause = true;
  //clears the screen darkening from difficulty selection
  document.getElementById("pause-menu-screen-darken").style.display = "none";
  
  // Set difficulty text
  if (difficulty == 1) { // Easy
    document.getElementById("level-counter").innerHTML = "Level: Easy";
  } else if (difficulty == 3) { // Hard
    document.getElementById("level-counter").innerHTML = "Level: Hard";
  } else { // Medium (default)
    document.getElementById("level-counter").innerHTML = "Level: Medium";
  }
  
  // Mutes the menu music
  menuMusic.loop(false);
  menuMusic.fadeOut(0, 1000);
  
  if (gamemode == "spelling") {
    var script = document.createElement("script");
    script.src = "js/spellingGame/spellingGame.js";
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(script);
    
    // Play space music for spelling game
    spellingMusic.loop(true);
    spellingMusic.fadeIn(1, 2000);
  } else if (gamemode == "math") {
    var script = document.createElement("script");
    script.src = "js/mathGame/mathGame.js";
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(script);
    
    // Play jungle music for math game
    mathMusic.loop(true);
    mathMusic.fadeIn(1, 2000);
  }
  
  // Display score at the top right
  document.getElementById("score-counter").innerHTML = 0;
  
  // Create the elements, start animation loop, and size the canvas
  createElements();
  animate();
  resizeCanvas();
}

/**
 * Initalizes the elements.
 */
function createElements() {
  // Initialize falling elements array
  for (var i = 0; i < elementAmount; i++) {
    elements[i] = new Element();
    elements[i].init(0, 0, elementWidth, elementHeight);
  }
  
  // Spawn falling elements
  for (var i = 0; i < elementAmount; i++) {
    newElement(i);
  }
  
  // Initialize special elements array
  for (var i = 0; i < specialAmount; i++) {
    specialItems[i] = new SpecialElement();
    specialItems[i].init(0, 0, specialWidth, specialHeight);
  }
  specialItems[0].character = "egg"; // Easter egg character
  specialItems[1].character = "life"; // Extra life character
  
  // The special element that will fall
  specialElement = new SpecialElement();
  specialElement.init(0, 0, specialWidth, specialHeight);
  
  // Spawn special element
  newSpecialItem();
  specialSpawned = false;
  // Spawn special element 60 - 90 seconds after loading
  specialSpawnTimer = Math.floor(Math.random() * 30000) + 60000; 
  setTimeout(function () {
      specialSpawned = true;
    }, specialSpawnTimer);
  
  // Initialize bonus elements array
  for (var i = 0; i < bonusAmount; i++) {
    bonusItems[i] = new BonusElement();
    bonusItems[i].init(0, 0, bonusWidth, bonusHeight);
    bonusItems[i].img.src = "images/special/bonus.png";
    bonusItems[i].character = "@";
  }
}