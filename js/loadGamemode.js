$(document).ready(function () {
  
  // Gets words from a file
  $.get("js/spellingGame/wordList.html", function (data) {
    addWords(data.toUpperCase().split("\n"));
  });
  
  /**
   * Calls loadGamemode() when the start button is clicked.
   */
  $("#start-button").click(function () {
    $("#main-menu").fadeOut(1000);
    $("#menu-bg").fadeOut(1000);
    $("#game").fadeIn(2000);
    $("#difficulty-menu").css({display: "none"});
    $("#pause-menu-screen-darken").css({display: "none"});
    
    loadGamemode();
  });
});

/**
 * Adds the words from the file to the word list.
 */
function addWords(data) {
  wordList = data;
}

/**
 * Loads the selected gamemode to play and starts
 * the animation loop.
 */
function loadGamemode() {
  canPause = true;
  // Clears the screen darkening from difficulty selection
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
    
    // Fade in space background for spelling game
    $("#spelling-bg").fadeIn(500);
    
    if (localStorage.getItem("Mute") != "muted") {
      // Play space music for spelling game
      spellingMusic.loop(true);
      spellingMusic.fadeIn(1, 1800);
    }
    
    // Start by drawing word
    var randomIndex = Math.floor(Math.random() * wordList.length);
    currentWord = wordList[randomIndex];
    wordLength = currentWord.length;
  } else if (gamemode == "math") {
    var script = document.createElement("script");
    script.src = "js/mathGame/mathGame.js";
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(script);
    
    // Draw background image for math gamemode
    imageRepository.background1.src = imageRepository.mathBg1.src;
    imageRepository.background2.src = imageRepository.mathBg2.src;
    imageRepository.background3.src = imageRepository.mathBg3.src;
    
    // Set player sprite for math gamemode
    imageRepository.player.src = imageRepository.mathPlayer.src;
    
    document.getElementById("gradient").style = "opacity: 0.5";
    
    // Fade in jungle background for math game
    $("#math-bg").fadeIn(500);
    
    if (localStorage.getItem("Mute") != "muted") {
      // Play jungle music for math game
      mathMusic.loop(true);
      mathMusic.fadeIn(1, 1800);
    }
  }
  
  // Display score at the top right
  document.getElementById("score-counter").innerHTML = 0;
  
  // Create the elements, start animation loop, and size the canvas
  createElements();
  animate();
  resizeCanvas();
  gameActive = true;
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
    newBonusItem(i);
  }
}