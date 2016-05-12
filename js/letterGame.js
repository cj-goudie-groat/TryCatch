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
var spawnTimer = null; // Spawn timer
var letterSpeed = 4; // Moves [n]px down every timer tick
var timerTick = 8; // Timer tick every [n]ms
var letterAmount = 10; // Amount of letters to continuously spawn
var imageWidth = 40; // Width of the image
var imageHeight = 40; // Height of the image
var letterCount = 0; // Amount of letter collected in the word

var currentWord; // Current word to find
var wordList = ["MARS", "STAR", "SHIP", "HALO", "MOON"];

/**
 * Clears the canvas [letterSpeed]px above the letter sprites to remove trails.
 */
function clearRect() {
  for (var i = 0; i < letterAmount; i++) {
    ctx.clearRect(letters[i].xPos, letters[i].yPos - letterSpeed, imageWidth, imageHeight);
  }
  ctx.clearRect(0, canvas.height - letterSpeed, canvas.width, letterSpeed);
}

/**
 * Based on letterVal, the letter image will be replaced with a new letter,
 * and spawn at a random height above the screen, except for letterY, which will
 * be set to 50 so it always has 1 image on the screen.
 */
function newValues(index) {
  var randomChar = Math.floor(Math.random() * characters.length);
  letters[index].img.src = characters[randomChar].img.src;
  letters[index].xPos = Math.floor(Math.random() * (canvas.width - imageWidth));
  letters[index].letter = characters[randomChar].letter;

  if (index == 0) {
    letters[0].yPos = -50;
  } else {
    letters[index].yPos = Math.floor(Math.random() * (canvas.height - imageHeight) * -1);
  }
};

/**
 * Checks for a collision between the ship and a letter.
 */
function checkCollision(i) {
	if(paused) {
		return;
	}
  var collectedWord = document.getElementById("collected-word");
  var letterRect = {
    x: letters[i].xPos,
    y: letters[i].yPos,
    width: imageWidth,
    height: imageWidth
  };
  
  var shipRect = {
    x: game.ship.x,
    y: game.ship.y,
    widthOffset: 48,
    heightOffset: 59,
    width: imageRepository.spaceship.width,
    height: imageRepository.spaceship.height
  }

  if (shipRect.x + shipRect.widthOffset < letterRect.x + letterRect.width &&
    shipRect.x + (shipRect.width - shipRect.widthOffset) > letterRect.x &&
    (window.innerHeight - imageRepository.spaceship.height) < letterRect.y + letterRect.height &&
    shipRect.heightOffset + (window.innerHeight - shipRect.height) > letterRect.y) {
    
    if(letters[i].letter.toUpperCase() == currentWord.charAt(letterCount)) {
      current_Score += 100;
        document.getElementById("score_Counter").innerHTML = "Score: " + current_Score;
      letterCount++;
      collectedWord.innerHTML += letters[i].letter.toUpperCase();
      
      if(letterCount == currentWord.length) {
        letterCount = 0;
        current_Score += 500;
        document.getElementById("score_Counter").innerHTML = "Score: " + current_Score;
        collectedWord.innerHTML = "";
        drawWord();
      }
    }
    else {
      current_Lives--;
      document.getElementById("life_Counter").innerHTML = "Lives: " + current_Lives;
    }
    newValues(i);
  }
}

/**
 * Draw a random word at the top.
 */
function drawWord() {
	if(paused) {
		return;
	}
  var randomIndex = Math.floor(Math.random() * wordList.length);
  var word = document.getElementById("word");
  currentWord = wordList[randomIndex];
  word.innerHTML = currentWord;
}

/**
 * Makes letters move, checks if they're off the screen, and then calls
 * newValues() to spawn a new random letter.
 */
function drawLetter() {
	if(paused) {
		return;
	}
  clearRect();
  for (var i = 0; i < letterAmount; i++) {
    checkCollision(i);
    ctx.drawImage(letters[i].img, letters[i].xPos, letters[i].yPos);
    letters[i].yPos += letterSpeed;
    if (letters[i].yPos > canvas.height) {
      newValues(i);
    }
  }
};

/**
 * Calls draw letter every letterTickRate, and moves them 
 * setInterval pixels.
 */
function draw() {
	if(paused) {
		return;
	}
  clearRect();
  spawnTimer = setInterval("drawLetter();", timerTick);
}

/**
 * Populates the characters array with images and its letter, and
 * fills the letters array for the letters that will be created.
 */
function addLetters() {
  for (var i = 0; i < characterTotal; i++) {
    characters[i] = new Letter();
    characters[i].img.src = "images/letters/" + String.fromCharCode(i + 97) + ".png";
    characters[i].letter = String.fromCharCode(i + 97);
  }

  for (var i = 0; i < letterAmount; i++) {
    var randomChar = Math.floor(Math.random() * characters.length);
    letters[i] = new Letter();
    letters[i].img.src = characters[randomChar].img.src;
    letters[i].xPos = Math.floor(Math.random() * (canvas.width - imageWidth));
    letters[i].yPos = Math.floor(Math.random() * (canvas.height + imageHeight) * -1);
    letters[i].letter = characters[randomChar].letter;
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
