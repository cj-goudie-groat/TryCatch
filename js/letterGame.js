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
var timerTick = 20; // Timer tick every [n]ms
var letterAmount = 3; // Amount of letters to continuously spawn
var imageWidth = 40; // Width of the image
var imageHeight = 40; // Height of the image
var letterCount = 0;

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
  var randomChar = randomLetter();
  letters[index].img.src = characters[randomChar].img.src;
  letters[index].xPos = Math.floor(Math.random() * (canvas.width - imageWidth));
  letters[index].letter = characters[randomChar].letter;
  console.log(letters[index].letter);

  if (index == 0) {
    letters[0].yPos = -50;
  } else {
    letters[index].yPos = Math.floor(Math.random() * (canvas.height - imageHeight) * -1);
  }
};

/**
 * Gives a random number between 0 and 25.
 */
function randomLetter() {
  return Math.floor(Math.random() * characters.length);
};

function checkCollision(i) {
  var letterRect = {
    x: letters[i].xPos,
    y: letters[i].yPos,
    width: 40,
    height: 40
  };
  
  var shipRect = {
    x: shipX,
    y: game.ship.y,
    widthOffset: 48,
    heightOffset: 59,
    height: imageRepository.spaceship.height
  }

  if (shipRect.x < letterRect.x + letterRect.width &&
    shipRect.x + shipRect.widthOffset > letterRect.x &&
    (window.innerHeight - imageRepository.spaceship.height) < letterRect.y + letterRect.height &&
    shipRect.heightOffset + (window.innerHeight - shipRect.height) > letterRect.y) {

    console.log("" + letters[i].letter);
  } else {
    console.log("");
  }

}

function drawWord() {
  var randomWord = Math.floor(Math.random() * wordList.length);
}

/**
 * Makes letters move, checks if they're off the screen, and then calls
 * newValues() to spawn a new random letter.
 */
function drawLetter() {
  clearRect();
  for (var i = 0; i < letterAmount; i++) {
    ctx.drawImage(letters[i].img, letters[i].xPos, letters[i].yPos);
    letters[i].yPos += letterSpeed;
    checkCollision(i);
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
    console.log(characters[i].letter);
  }

  for (var i = 0; i < letterAmount; i++) {
    var randomChar = randomLetter();
    letters[i] = new Letter();
    letters[i].img.src = characters[randomChar].img.src;
    letters[i].xPos = Math.floor(Math.random() * (canvas.width - imageWidth));
    letters[i].yPos = Math.floor(Math.random() * (canvas.height + imageHeight) * -1);
    letters[i].letter = characters[randomChar].letter;
  }
}

/**
 * Sets up the arrays and starts the program
 */
function init() {
  addLetters();
  draw();
}

window.onload = init();
