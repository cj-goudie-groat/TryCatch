var canvas = document.getElementById("elements"); // Canvas
var ctx = canvas.getContext("2d"); // Canvas context
var letterAmount = 26; // Amount of letters
var letterArray = []; // Array of letter image sprites
var spawnTimer = null; // Spawn timer
var letterSpeed = 3; // Moves [n]px down every timer tick
var timerTick = 25; // Timer tick every [n]ms
var imageWidth = 40; // Width of letter sprite
var imageHeight = 40; // Height of letter sprite

var letter1X = Math.floor(Math.random() * (canvas.width - imageWidth));
var letter2X = Math.floor(Math.random() * (canvas.width - imageWidth));
var letter3X = Math.floor(Math.random() * (canvas.width - imageWidth));
var letter4X = Math.floor(Math.random() * (canvas.width - imageWidth));

var letter1Y = -50
var letter2Y = Math.floor(Math.random() * (canvas.height + imageHeight) * -1);
var letter3Y = Math.floor(Math.random() * (canvas.height + imageHeight) * -1);
var letter4Y = Math.floor(Math.random() * (canvas.height + imageHeight) * -1);

var letter1Index = Math.floor(Math.random() * letterAmount);
var letter2Index = Math.floor(Math.random() * letterAmount);
var letter3Index = Math.floor(Math.random() * letterAmount);
var letter4Index = Math.floor(Math.random() * letterAmount);

/**
 * Clears the canvas [letterSpeed]px above the letter sprites to remove trails.
 */
function clearRect() {
	ctx.clearRect(letter1X, letter1Y -letterSpeed, 40, 40);
	ctx.clearRect(letter2X, letter2Y -letterSpeed, 40, 40);
	ctx.clearRect(letter3X, letter3Y -letterSpeed, 40, 40);
	ctx.clearRect(letter4X, letter4Y -letterSpeed, 40, 40);
	
	ctx.clearRect(0, canvas.height-3, canvas.width, 3);
}

/**
 * Based on letterVal, the letter image will be replaced with a new letter,
 * and spawn at a random height above the screen, except for letterY, which will
 * be set to 50 so it always has 1 image on the screen.
 */
function newValues(letterVal) {
  if (letterVal == 1) {
    letter1X = Math.floor(Math.random() * (canvas.width - imageWidth));
    letter1Y = -50
    letter1Index = Math.floor(Math.random() * letterAmount);
  }
  if (letterVal == 2) {
    letter2X = Math.floor(Math.random() * (canvas.width - imageWidth));
    letter2Y = Math.floor(Math.random() * (canvas.height + imageHeight) * -1);
    letter2Index = Math.floor(Math.random() * letterAmount);
  }
  if (letterVal == 3) {
    letter3X = Math.floor(Math.random() * (canvas.width - imageWidth));
    letter3Y = Math.floor(Math.random() * (canvas.height + imageHeight) * -1);
    letter3Index = Math.floor(Math.random() * letterAmount);
  }
  if (letterVal == 4) {
    letter4X = Math.floor(Math.random() * (canvas.width - imageWidth));
    letter4Y = Math.floor(Math.random() * (canvas.height + imageHeight) * -1);
    letter4Index = Math.floor(Math.random() * letterAmount);
  }
}

/**
 * Makes letters move, checks if they're off the screen, and then calls
 * newValues() to spawn a new random letter.
 */
function drawLetter() {
  
  clearRect();
  ctx.drawImage(letterArray[letter1Index], letter1X, letter1Y);
  ctx.drawImage(letterArray[letter2Index], letter2X, letter2Y);
  ctx.drawImage(letterArray[letter3Index], letter3X, letter3Y);
  ctx.drawImage(letterArray[letter4Index], letter4X, letter4Y);
  
  letter1Y += letterSpeed;
  letter2Y += letterSpeed;
  letter3Y += letterSpeed;
  letter4Y += letterSpeed;
  
  if (letter1Y > canvas.height) {
    newValues(1);
  }
  if (letter2Y > canvas.height) {
    newValues(2);
  }
  if (letter3Y > canvas.height) {
    newValues(3);
  }
  if (letter4Y > canvas.height) {
    newValues(4);
  }
}

function checkCollision() {
  var letterRect1 = {
    x: letter1X,
    y: letter1Y,
    width: 40,
    height: 40
  };
  var letterRect2 = {
    x: letter2X,
    y: letter2Y,
    width: 40,
    height: 40
  };
  var letterRect3 = {
    x: letter3X,
    y: letter3Y,
    width: 40,
    height: 40
  };
  var letterRect4 = {
    x: letter4X,
    y: letter4Y,
    width: 40,
    height: 40
  };
  
  if ((game.ship.x < letterRect1.x + letterRect1.width && game.ship.x + 24 > letterRect1.x &&
    (window.innerHeight - imageRepository.spaceship.height) < letterRect1.y + letterRect1.height &&
    60 + (window.innerHeight - imageRepository.spaceship.height) > letterRect1.y) ||
    
    (game.ship.x < letterRect2.x + letterRect2.width && game.ship.x + 24 > letterRect1.x &&
    (window.innerHeight - imageRepository.spaceship.height) < letterRect2.y + letterRect2.height &&
    60 + (window.innerHeight - imageRepository.spaceship.height) > letterRect2.y) ||
    
    (game.ship.x < letterRect2.x + letterRect3.width && game.ship.x + 24 > letterRect3.x &&
    (window.innerHeight - imageRepository.spaceship.height) < letterRect3.y + letterRect3.height &&
    60 + (window.innerHeight - imageRepository.spaceship.height) > letterRect3.y) ||
    
    (game.ship.x < letterRect4.x + letterRect4.width && game.ship.x + 24 > letterRect4.x &&
    (window.innerHeight - imageRepository.spaceship.height) < letterRect4.y + letterRect4.height &&
    60 + (window.innerHeight - imageRepository.spaceship.height) > letterRect4.y)) {
    
    console.log("shit");
  }
}

/**
 * Calls draw letter every letterTickRate, and moves them 
 * setInterval pixels.
 */
function draw() {
  clearRect();
  spawnTimer = setInterval("drawLetter();", timerTick);
  spawnTimer = setInterval("checkCollision();", timerTick);
}
/**
 * Populates the letterArray with images, if there's a better way to do this than
 * 26 cases, pls change.
 */
function addLetter() {
  for (var i = 0; i < 26; i++) {
    switch (i) {
      case 0:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/a.png";
        break;
      case 1:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/b.png";
        break;
      case 2:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/c.png";
        break;
      case 3:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/d.png";
        break;
      case 4:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/e.png";
        break;
      case 5:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/f.png";
        break;
      case 6:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/g.png";
        break;
      case 7:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/h.png";
        break;
      case 8:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/i.png";
        break;
      case 9:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/j.png";
        break;
      case 10:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/k.png";
        break;
      case 11:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/l.png";
        break;
      case 12:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/m.png";
        break;
      case 13:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/n.png";
        break;
      case 14:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/o.png";
        break;
      case 15:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/p.png";
        break;
      case 16:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/q.png";
        break;
      case 17:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/r.png";
        break;
      case 18:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/s.png";
        break;
      case 19:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/t.png";
        break;
      case 20:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/u.png";
        break;
      case 21:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/v.png";
        break;
      case 22:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/w.png";
        break;
      case 23:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/y.png";
        break;
      case 24:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/y.png";
        break;
      case 25:
        letterArray[i] = new Image();
        letterArray[i].src = "./images/letters/z.png";
        break;
    }
  }
  drawLetter();
}

function init() {
  draw();
  addLetter();
}

window.onload = init();