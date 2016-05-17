/**
 * Object to hold values for the falling letters.
 */
function Letter() {
  this.img = new Image(); // Image for the letter
  this.xPos; // X position of the letter
  this.yPos; // Y position of the letter
  this.letter; // Character of the letter
}

var characterTotal = 26;
var characters = []; // Array for all 26 characters
var letters = []; // Array for spawning letters
var canvas = document.getElementById("elements"); // Canvas
var ctx = canvas.getContext("2d"); // Canvas context
var letterSpeed; // Speed of the letters
var letterAmount; // Amount of letters to continuously spawn
var letterWidth = 40; // Width of the letters
var letterHeight = 40; // Height of the letters
var letterCount = 0; // Amount of letters collected in the word

var specialItem = new Letter(); // Spawned special item
var specialItems = []; // Array for special items
var specialSpeed = 8; // Speed of the special items
var specialAmount = 1; // Amount of special items to spawn
var specialWidth = 40; // Width of the special items
var specialHeight = 40; // Height of the special items
var specialSpawned = false; // Boolean for special item spawned or not
var specialSpawnTimer; // Random spawn timer for special items

var bonusLength = 10000; // Bonus level active in ms
var bonusItems = []; // Array for bonus items
var bonusAmount = 30; // Amount of items to spawn on bonus level
var bonusSpeed = 5; // Speed of items on bonus level
var bonusWidth = 70; // Width of the bonus items
var bonusHeight = 70; // Height of the bonus items

var word = document.getElementById("word");
var collectedWord = document.getElementById("collected-word");
var wordRow = document.getElementById("word-row");
var currentWord; // Current word to find
var wordList = ["MARS", "STAR", "SHIP", "HALO", "MOON"];
var currentLetter = 0;

/**
 * Clears the canvas [elementMove]px above the letter sprites to remove trails.
 */
function clearLetter() {
  for (var i = 0; i < letterAmount; i++) {
    ctx.clearRect(letters[i].xPos, letters[i].yPos - letterSpeed, letterWidth, letterHeight);
  }
  ctx.clearRect(0, canvas.height - letterSpeed, canvas.width, letterSpeed);
}

/**
 * Clears the canvas [elementMove]px above the special items sprites to remove trails.
 */
function clearSpecial() {
  ctx.clearRect(specialItem.xPos, specialItem.yPos - specialSpeed, specialWidth, specialHeight);
  ctx.clearRect(0, canvas.height - specialSpeed, canvas.width, specialSpeed);
}

/**
 * Clears the canvas [elementMove]px above the letter sprites to remove trails.
 */
function clearBonus() {
  for (var i = 0; i < bonusAmount; i++) {
    ctx.clearRect(bonusItems[i].xPos, bonusItems[i].yPos - bonusSpeed, bonusWidth, bonusHeight);
  }
  ctx.clearRect(0, canvas.height - bonusSpeed, canvas.width, bonusSpeed);
}
/**
 * The letter image will be replaced with a new letter,
 * and spawn at a random height above the screen
 */
function newLetter(index) {
  var randomChar = Math.floor(Math.random() * characters.length);
  letters[index].xPos = Math.floor(Math.random() * (canvas.width - letterWidth * 3)) + letterWidth;
  letters[index].yPos = Math.floor(Math.random() * (canvas.height + letterHeight) * -1);
  letters[index].img.src = characters[randomChar].img.src;
  letters[index].letter = characters[randomChar].letter;
  
  // Check for collision with other letters
  for (var i = 0; i < letterAmount; i++) {
    if (i == index) {
      i++;
    } else {
      while (letters[index].xPos < letters[i].xPos + letterWidth &&
            letters[index].xPos + letterWidth > letters[i].xPos &&
            letters[index].yPos < letters[i].yPos + letterHeight &&
            letters[index].yPos + letterHeight > letters[i].yPos) {
        
        letters[index].yPos -= letterHeight;
      }
    }
  }
}

function newSpecialItem() {
  var index = Math.floor(Math.random() * specialAmount);
  specialItem.img.src = "images/special/" + index + ".png";
  specialItem.xPos = Math.floor(Math.random() * (canvas.width - specialWidth * 3)) + specialWidth;
  specialItem.yPos = Math.floor(Math.random() * (canvas.height - specialHeight) * -1);
  specialItem.letter = index;
}

function newBonusItem(index) {
  bonusItems[index].xPos = Math.floor(Math.random() * (canvas.width - bonusWidth));
  bonusItems[index].yPos = Math.floor(Math.random() * (canvas.height - bonusHeight) * -1);
}

/**
 * Checks for a collision between the ship and a letter.
 */
function checkCollision(i, letter) {
  if (paused) {
    return;
  }
  
  var shipRect = {
    x: game.ship.x,
    y: game.ship.y,
    widthOffset: 48,
    heightOffset: 59,
    width: imageRepository.spaceship.width,
    height: imageRepository.spaceship.height
  };
  
  if (letter == '@') { // bonus level character
    var bonusRect = {
      x: bonusItems[i].xPos,
      y: bonusItems[i].yPos,
      width: bonusWidth,
      height: bonusHeight
    };
    
    if (shipRect.x + shipRect.widthOffset < bonusRect.x + bonusRect.width &&
        shipRect.x + (shipRect.width - shipRect.widthOffset) > bonusRect.x &&
        (window.innerHeight - shipRect.height) < bonusRect.y + bonusRect.height &&
        shipRect.heightOffset + (window.innerHeight - shipRect.height) > bonusRect.y) {
      
      currentScore += 50;
      document.getElementById("score-counter").innerHTML = "" + currentScore;
      newBonusItem(i);
    }
  } else if (isNaN(letter)) { // letter character
    var letterRect = {
      x: letters[i].xPos,
      y: letters[i].yPos,
      width: letterWidth,
      height: letterHeight
    };

    if (shipRect.x + shipRect.widthOffset < letterRect.x + letterRect.width &&
        shipRect.x + (shipRect.width - shipRect.widthOffset) > letterRect.x &&
        (window.innerHeight - shipRect.height) < letterRect.y + letterRect.height &&
        shipRect.heightOffset + (window.innerHeight - shipRect.height) > letterRect.y) {

      if(letter == currentWord.charAt(letterCount)) {
        currentScore += 100;
        document.getElementById("score-counter").innerHTML = "" + currentScore;
        wordRow.cells[currentLetter].style = "color: #fff";
        currentLetter++;
        
        if(letterCount == currentWord.length) {
          letterCount = 0;
          currentScore += 500;
          document.getElementById("score-counter").innerHTML = "" + currentScore;
          collectedWord.innerHTML = "";
          drawWord();
        }
      } else {
          currentLives--;
          updateLives();
          // Determines if you lost the game or not
          if (currentLives == 0) {
            paused = true;
            document.getElementById("score").innerHTML = "Your final score was: " + currentScore;
            document.getElementById("game-over").style.display = "block";
            document.getElementById("pause-menu-screen-darken").style.display = "block";
            updateLives();
          }
      }
      newLetter(i);
    }
  } else if (letter >= 0) { // special item character
    var specialRect = {
      x: specialItem.xPos,
      y: specialItem.yPos,
      width: specialWidth,
      height: specialHeight
    };
    
    if (shipRect.x + shipRect.widthOffset < specialRect.x + specialRect.width &&
      shipRect.x + (shipRect.width - shipRect.widthOffset) > specialRect.x &&
      (window.innerHeight - shipRect.height) < specialRect.y + specialRect.height &&
      shipRect.heightOffset + (window.innerHeight - shipRect.height) > specialRect.y) {
      
      bonusActive = true;
      bonusLevel();
      newSpecialItem();
    }
  }
}

/**
 * Starts the bonus level and lasts for bonusLength ms
 */
function bonusLevel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update ships model
  game.ship.draw();
  // Wait for [bonusLength]ms to end bonus level
  setTimeout(function() {
    bonusActive = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Update ships model
    game.ship.draw();
    
    for (var i = 0; i < bonusAmount; i++) {
      bonusItems[i].xPos = Math.floor(Math.random() * (canvas.width - bonusWidth));
      bonusItems[i].yPos = Math.floor(Math.random() * (canvas.height - bonusHeight) * -1);
    }
    
    for (var i = 0; i < letterAmount; i++) {
      newLetter(i);
    }
    
    specialSpawned = false;
    specialSpawnTimer = Math.floor(Math.random() * 15000) + 15000; // Spawn 15 - 30 seconds after bonus level
    setTimeout(function () {
      specialSpawned = true;
      newSpecialItem();
    }, specialSpawnTimer);
    
  }, bonusLength);
}

/**
 * Calls checkCollision(), makes lbonus items move, 
 * checks if they're off the screen, and then calls
 * newBonusItem() to spawn a new bonus item.
 */
function drawBonus() {
  if (paused || !bonusActive) {
    return;
  }
  
  clearBonus();
  for (var i = 0; i < bonusAmount; i++) {
    checkCollision(i, bonusItems[i].letter);
    ctx.drawImage(bonusItems[i].img, bonusItems[i].xPos, bonusItems[i].yPos);
    bonusItems[i].yPos += bonusSpeed;
    if (bonusItems[i].yPos > canvas.height) {
      newBonusItem(i);
    }
  }
}

/**
 * Draw a random word at the top to collect.
 */
function drawWord() {
  var randomIndex = Math.floor(Math.random() * wordList.length);
  currentWord = wordList[randomIndex];
  wordLength = currentWord.length;
  for (var i = 0; i < wordLength; i++) {
    wordRow.insertCell(0);
  }
  for (var i = 0; i < wordLength; i++) {
    wordRow.cells[i].innerHTML = currentWord.charAt(i);
  }
}

/**
 * Clears cells in word row.
 */
function clearWord() {
  wordRow.innerHTML = "";
}

/**
 * Calls checkCollision(), makes letters move, 
 * checks if they're off the screen, and then calls
 * newLetter() to spawn a new random letter.
 */
function drawLetter() {
  if (paused || bonusActive) {
    return;
  }
  
  clearLetter();
  for (var i = 0; i < letterAmount; i++) {
    checkCollision(i, letters[i].letter);
    ctx.drawImage(letters[i].img, letters[i].xPos, letters[i].yPos);
    letters[i].yPos += letterSpeed;

    if (letters[i].yPos > canvas.height) {
      newLetter(i);
    }

  }
}

/**
 * Calls checkCollision(), makes special items move, 
 * checks if they're off the screen, and then calls
 * newSpecialItem() to spawn a new random special item
 * once every 15 - 30 seconds.
 */
function drawSpecialItem() {
  if (paused || bonusActive) {
    return;
  }
  
  clearSpecial();
  checkCollision(null, specialItem.letter);
  
  if (specialSpawned) {
    ctx.drawImage(specialItem.img, specialItem.xPos, specialItem.yPos);
    specialItem.yPos += specialSpeed;
  } 
  
  if (specialItem.yPos > canvas.height) {
    specialItem.yPos = 0;
    specialSpawned = false;
    specialSpawnTimer = Math.floor(Math.random() * 15000) + 15000; // Spawn every 15 - 30 seconds
    setTimeout(function () {
      specialSpawned = true;
      newSpecialItem();
    }, specialSpawnTimer);
  }
}

/**
 * Animates the falling elements.
 */
function draw() {
  drawLetter();
  drawSpecialItem();
  drawBonus();
  requestAnimFrame(draw);
}

/**
 * Populates the characters array with images and its letter, and
 * fills the letters array for the letters that will be created.
 */
function addLetters() {
  // Fill alphabet array
  for (var i = 0; i < characterTotal; i++) {
    characters[i] = new Letter();
    characters[i].img.src = "images/letters/" + String.fromCharCode(i + 97) + ".png";
    characters[i].letter = String.fromCharCode(i + 65);
  }

  // Fill letters to spawn array
  for (var i = 0; i < letterAmount; i++) {
    var randomChar = Math.floor(Math.random() * characters.length);
    letters[i] = new Letter();
    letters[i].xPos = 0;
    letters[i].yPos = 0;
  }
  
  // Randomize the letter positions and letter
  for (var i = 0; i < letterAmount; i++) {
    newLetter(i);
  }
  
  // Fill special items array
  for (var i = 0; i < specialAmount; i++) {
    specialItems[i] = new Letter();
    specialItems[i].img.src = "images/special/" + i + ".png";
    specialItems[i].letter = i;
  }
  
  // Assign a random special item to start
  specialItem.xPos = 0;
  specialItem.yPos = 0;
  newSpecialItem();
  specialSpawnTimer = Math.floor(Math.random() * 15000) + 15000; // Spawn 15 - 30 seconds after start
    setTimeout(function () {
      specialSpawned = true;
    }, specialSpawnTimer);

  // Fill bonus level items array
  for (var i = 0; i < bonusAmount; i++) {
    bonusItems[i] = new Letter();
    bonusItems[i].img.src = "images/special/bonus.png"
    bonusItems[i].xPos = Math.floor(Math.random() * (canvas.width - bonusWidth));
    bonusItems[i].yPos = Math.floor(Math.random() * (canvas.height - bonusHeight) * -1);
    bonusItems[i].letter = '@';
  }
}

function retryGame() {
  // Reset letters and special item positions
  for (var i = 0; i < letterAmount; i++) {
    newLetter(i);
  }
  
  specialSpawned = false;
  specialSpawnTimer = Math.floor(Math.random() * 15000) + 15000; // Spawn 15 - 30 seconds after retry
    setTimeout(function () {
      specialSpawned = true;
      newSpecialItem();
    }, specialSpawnTimer);
  
  currentLives = 5;
  currentScore = 0;
  
  clearWord();
  drawWord();
  collectedWord.innerHTML = "";
  letterCount = 0;
  
  //Resets the lives and Scores
  document.getElementById("score-counter").innerHTML = "" + currentScore;
  updateLives();
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);9
  
  //Resumes the game
  document.getElementById("game-over").style.display = "none";
  resume();
}


/**
 * Sets up the arrays and starts the program.
 */
function init() {
  //clears the screen darkening from difficulty selection
  document.getElementById("pause-menu-screen-darken").style.display = "none";
  
  if (difficulty == 1) {
    letterSpeed = 3; // Speed of the letters
    letterAmount = 10; // Amount of letters to spawn
  } else if (difficulty == 3) { //hard
    letterSpeed = 10; // Speed of the letters
    letterAmount = 30; // Amount of letters to spawn
  } else { //medium (default difficulty)
    letterSpeed = 7; // Speed of the letters
    letterAmount = 20; // Amount of letters to spawn
  }
  
  addLetters();
  draw();
  drawWord();
}

window.onload = init(); 