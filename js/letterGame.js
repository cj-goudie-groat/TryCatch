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
var spawnTimer = null; // Spawn timer for letters
var letterSpeed = 15; // Speed of the letters
var letterAmount = 15; // Amount of letters to continuously spawn
var letterWidth = 40; // Width of the letters
var letterHeight = 40; // Height of the letters
var letterCount = 0; // Amount of letters collected in the word

var specialItem = new Letter(); // Spawned special item
var specialItems = []; // Array for special items
var specialTimer = null; // Spawn timer for special items
var specialSpeed = 10; // Speed of the special items
var specialAmount = 1; // Amount of special items to spawn
var specialWidth = 40; // Width of the special items
var specialHeight = 40; // Height of the special items
var specialSpawned = true; // Boolean for special item spawned or not

var bonusLength = 15000; // Bonus level active in ms
var bonusItems = []; // Array for bonus items
var bonusAmount = 30; // Amount of items to spawn on bonus level
var bonusSpeed = 10; // Speed of items on bonus level
var bonusTimer = null; // Spawn timer for bonus level
var bonusWidth = 70; // Width of the bonus items
var bonusHeight = 70; // Height of the bonus items

var elementMove = 3; // Moves elements [n]px down every tick

var word = document.getElementById("word");
var collectedWord = document.getElementById("collected-word");
var currentWord; // Current word to find
var wordList = ["MARS", "STAR", "SHIP", "HALO", "MOON"];

/**
 * Clears the canvas [elementMove]px above the letter sprites to remove trails.
 */
function clearLetter() {
  for (var i = 0; i < letterAmount; i++) {
    ctx.clearRect(letters[i].xPos, letters[i].yPos - elementMove, letterWidth, letterHeight);
  }
  ctx.clearRect(0, canvas.height - elementMove, canvas.width, elementMove);
}

/**
 * Clears the canvas [elementMove]px above the special items sprites to remove trails.
 */
function clearSpecial() {
  ctx.clearRect(specialItem.xPos, specialItem.yPos - elementMove, specialWidth, specialHeight);
  ctx.clearRect(0, canvas.height - elementMove, canvas.width, elementMove);
}

/**
 * Clears the canvas [elementMove]px above the letter sprites to remove trails.
 */
function clearBonus() {
  for (var i = 0; i < bonusAmount; i++) {
    ctx.clearRect(bonusItems[i].xPos, bonusItems[i].yPos - elementMove, bonusWidth, bonusHeight);
  }
  ctx.clearRect(0, canvas.height - elementMove, canvas.width, elementMove);
}

/**
 * The letter image will be replaced with a new letter,
 * and spawn at a random height above the screen, except for letterY, which will
 * be set to 50 so it always has 1 image on the screen.
 */
function newLetter(index) {
  var randomChar = Math.floor(Math.random() * characters.length);
  letters[index].img.src = characters[randomChar].img.src;
  letters[index].xPos = Math.floor(Math.random() * (canvas.width - letterWidth * 3)) + letterWidth;
  letters[index].yPos = Math.floor(Math.random() * (canvas.height - letterHeight) * -1);
  letters[index].letter = characters[randomChar].letter;
}

function newSpecialItem() {
  var index = Math.floor(Math.random() * specialAmount);
  specialItem.img.src = "images/special/" + index + ".png";
  specialItem.xPos = Math.floor(Math.random() * (canvas.width - specialWidth * 3)) + specialWidth;
  specialItem.yPos = Math.floor(Math.random() * (canvas.height + specialHeight) * -1);
  specialItem.letter = index;
  console.log("Spawn");
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
      document.getElementById("score-counter").innerHTML = "Score: " + currentScore;
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
        document.getElementById("score-counter").innerHTML = "Score: " + currentScore;
        letterCount++;
        collectedWord.innerHTML += letters[i].letter;

        if(letterCount == currentWord.length) {
          letterCount = 0;
          currentScore += 500;
          document.getElementById("score-counter").innerHTML = "Score: " + currentScore;
          collectedWord.innerHTML = "";
          drawWord();
        }
      } else {
        currentLives--;
        document.getElementById("life-counter").innerHTML = "Lives: " + currentLives;
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
  clearInterval(bonusTimer);
  bonusTimer = setInterval("drawBonus();", bonusSpeed);
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
    bonusItems[i].yPos += elementMove;
    if (bonusItems[i].yPos > canvas.height) {
      newBonusItem(i);
    }
  }
}

/**
 * Draw a random word at the top to collect.
 */
function drawWord() {
  if (paused) {
    return;
  }
  
  var randomIndex = Math.floor(Math.random() * wordList.length);
  currentWord = wordList[randomIndex];
  word.innerHTML = currentWord;
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
    letters[i].yPos += elementMove;
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
    specialItem.yPos += elementMove;
  }
  
  if (specialItem.yPos > canvas.height) {
    specialItem.yPos = 0;
    specialSpawned = false;
    var specialSpawnTimer = Math.floor(Math.random() * 15000) + 15000; // Spawn every 15 - 30 seconds
    setTimeout(function () {
      specialSpawned = true;
      newSpecialItem();
    }, specialSpawnTimer);
  }
}

/**
 * Calls draw letter every letterTickRate, and moves them 
 * setInterval pixels.
 */
function draw() {
  if (paused) {
    return;
  }
  
  clearLetter();
  clearSpecial();
  spawnTimer = setInterval("drawLetter();", letterSpeed);
  specialTimer = setInterval("drawSpecialItem();", specialSpeed);
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
    letters[i].img.src = characters[randomChar].img.src;
    letters[i].xPos = Math.floor(Math.random() * (canvas.width - letterWidth * 3)) + letterWidth;
    letters[i].yPos = Math.floor(Math.random() * (canvas.height + letterHeight) * -1);
    letters[i].letter = characters[randomChar].letter;
  }
  
  // Fill special items array
  for (var i = 0; i < specialAmount; i++) {
    specialItems[i] = new Letter();
    specialItems[i].img.src = "images/special/" + i + ".png";
    specialItems[i].letter = i;
  }
  
  // Assign a random special item to start
  var randomSpecial = Math.floor(Math.random() * specialAmount);
  specialItem.img.src = specialItems[randomSpecial].img.src;
  specialItem.xPos = Math.floor(Math.random() * (canvas.width - specialWidth * 3)) + specialWidth;
  specialItem.yPos = Math.floor(Math.random() * (canvas.height + specialHeight) * -1);
  specialItem.letter = specialItems[randomSpecial].letter;
  
  // Fill bonus level items array
  for (var i = 0; i < bonusAmount; i++) {
    bonusItems[i] = new Letter();
    bonusItems[i].img.src = "images/special/bonus.png"
    bonusItems[i].xPos = Math.floor(Math.random() * (canvas.width - bonusWidth));
    bonusItems[i].yPos = Math.floor(Math.random() * (canvas.height - bonusHeight) * -1);
    bonusItems[i].letter = '@';
  }
}

/**
 * Sets up the arrays and starts the program.
 */
function init() {
  addLetters();
  draw();
  drawWord();
}

window.onload = init();