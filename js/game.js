/**
 * Initialize the Game and start it.
 */
var game = new Game();
var paused = false;
var bonusActive = false;

function init() {
  if (game.init()) {
    game.start();
    
    currentLives = 1;
    currentScore = 0;
    document.getElementById("life-counter").innerHTML = "Lives: " + currentLives;
    document.getElementById("score-counter").innerHTML = "Score: " + currentScore;
  }
}

function loadGamemode() {
  // Set difficulty text
  if (difficulty == 1) {
    currentLevel = "Easy";
    document.getElementById("level-counter").innerHTML = "Level: " + currentLevel;
  } else if (difficulty == 3) {
    currentLevel = "Hard";
    document.getElementById("level-counter").innerHTML = "Level: " + currentLevel;
  } else {
    currentLevel = "Medium";
    document.getElementById("level-counter").innerHTML = "Level: " + currentLevel;
  }
  
  // load letters game
  var script = document.createElement("script");
  script.src = "js/letterGame.js";
  script.type = "text/javascript";
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(script)
}

/**
 * Define an object to hold all our images for the game so images
 * are only ever created once. This type of object is known as a 
 * singleton.
 */
var imageRepository = new function () {	
  // Define images
  this.background = new Image();
  this.spaceship = new Image();
  this.bonusLevelBg = new Image();
  this.bonusLevelPlayer = new Image();
  
  // Ensure all images have loaded before starting the game
  var numImages = 4;
  var numLoaded = 0;

  function imageLoaded() {
    numLoaded++;
    if (numLoaded === numImages) {
      window.init();
    }
  }

  this.background.onload = function () {
    imageLoaded();
  }
  this.spaceship.onload = function () {
    imageLoaded();
  }
  this.bonusLevelBg.onload = function () {
    imageLoaded();
  }
  this.bonusLevelPlayer.onload = function () {
    imageLoaded();
  }

  // Set images src
  this.background.src = "images/background.png";
  this.spaceship.src = "images/shipanim/ship0.png";
  this.bonusLevelBg.src = "images/special/bonusbg.jpg";
  this.bonusLevelPlayer.src = "images/special/bonusplayer.png";
};

/**
 * Creates the Drawable object which will be the base class for
 * all drawable objects in the game. Sets up defualt variables
 * that all child objects will inherit, as well as the defualt
 * functions. 
 */
function Drawable() {
  this.init = function (x, y, width, height) {
    // Defualt variables
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  this.speed = 0;
  this.canvasWidth = 0;
  this.canvasHeight = 0;
  this.canCollide = "";
  this.isColliding = false;
  this.type = "";

  // Define abstract function to be implemented in child objects
  this.draw = function () {};
  this.move = function () {};
  this.canCollideWith = function(object) {
    return (this.canCollide === object.type);
  };
}

/**
 * Creates the Background object which will become a child of
 * the Drawable object. The background is drawn on the "background"
 * canvas and creates the illusion of moving by panning the image.
 */
function Background() {
  this.speed = 0; // Redefine speed of the background for panning

  // Implement abstract function 
  this.draw = function () {
  
  	//pauses the background
    if (paused) {
      return;
	}
    
    if (bonusActive) {
      this.context.drawImage(imageRepository.bonusLevelBg, this.x, this.y);
    } else {
      // Pan background
      this.context.drawImage(imageRepository.background, this.x, this.y);
    
      this.y += this.speed;
      // Draw another image at the top edge of the first image
      this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);
      
      // If the image scrolled off the screen, reset
      if (this.y >= this.canvasHeight) {
        this.y = 0;
      }
    }
  };
}
// Set Background to inherit properties from Drawable
Background.prototype = new Drawable();

/**
 * Create the Ship object that the player controls. The ship is
 * drawn on the "ship" canvas and uses dirty rectangles to move
 * around the screen.
 */
function Ship() {
  this.speed = 5;
  //this.shipL = 1;
  //this.shipR = 1;
  //this.shipAnim = new Image();
  
  var leftButton = document.getElementById("left-button");
  var rightButton = document.getElementById("right-button");
  
  leftButton.addEventListener("touchstart", function(e) {
      KEY_STATUS.left = true;
    }, false);

    leftButton.addEventListener("touchend", function(e) {
      KEY_STATUS.left = false;
    }, false);

  rightButton.addEventListener("touchstart", function(e) {
      KEY_STATUS.right = true;
    }, false);
  
  rightButton.addEventListener("touchend", function(e) {
      KEY_STATUS.right = false;
    }, false);
  
  this.draw = function () {
    this.context.clearRect(this.x, this.y, this.width, this.height);
    if (bonusActive) {
      this.context.drawImage(imageRepository.bonusLevelPlayer, this.x, this.y);
    } else {
      this.context.drawImage(imageRepository.spaceship, this.x, this.y);
    }
  };
  
  /*
  this.drawLeft = function () {
    this.shipAnim.src = "images/shipanim/shipl" + this.shipL + ".png";
    if (this.shipL < 5) {
      this.shipL++;
    }
    this.context.drawImage(this.shipAnim, this.x, this.y);
  };
  
  this.drawRight = function () {
    this.shipAnim.src = "images/shipanim/shipr" + this.shipR + ".png";
    if (this.shipR < 5) {
      this.shipR++;
    }
    this.context.drawImage(this.shipAnim, this.x, this.y);
  };
  */
  this.move = function () {
  	// Stops the ship from moving when paused!
    if (paused) {
      return;
	}
    
    // Determine if the action is move action
    if (KEY_STATUS.left || KEY_STATUS.right) {
      // The ship moved, so erase it's current image so it can
      // be redrawn in it's new location
      this.context.clearRect(this.x, this.y, this.width, this.height);

      // Update x and y according to the direction to move and
      // redraw the ship. Change the else if's to if statements
      // to have diagonal movement.
      if (KEY_STATUS.left) {
        this.shipR = 1;
        this.x -= this.speed
        
        // this.animTimer = setInterval(this.drawLeft(), 1000)
        if (this.x <= 0) { // Keep player within the screen
          this.x = 0;
        }
        
      } else if (KEY_STATUS.right) {
        this.shipL = 1;
        this.x += this.speed
        
        // this.animTimer = setInterval(this.drawRight(), 1000);
        if (this.x >= this.canvasWidth - this.width) {
          this.x = this.canvasWidth - this.width;
        }
      }
      this.draw();
    }
  };
}
Ship.prototype = new Drawable();

/**
 * Creates the Game object which will hold all objects and data for
 * the game.
 */
function Game() {
  /**
   * Gets canvas information and context and sets up all game
   * objects. 
   * Returns true if the canvas is supported and false if it
   * is not. This is to stop the animation script from constantly
   * running on browsers that do not support the canvas.
   */
  this.init = function () {
    // Get the canvas elements
    this.bgCanvas = document.getElementById("background");
    this.shipCanvas = document.getElementById("ship");

    // Test to see if canvas is supported. Only need to
    // check one canvas
    if (this.bgCanvas.getContext) {
      this.bgContext = this.bgCanvas.getContext("2d");
      this.shipContext = this.shipCanvas.getContext("2d");

      // Initialize objects to contain their context and canvas
      // information
      Background.prototype.context = this.bgContext;
      Background.prototype.canvasWidth = this.bgCanvas.width;
      Background.prototype.canvasHeight = imageRepository.spaceship.height;

      Ship.prototype.context = this.shipContext;
      Ship.prototype.canvasWidth = this.shipCanvas.width;
      Ship.prototype.canvasHeight = this.shipCanvas.height;
      
      // Initialize the background object
      this.background = new Background();
      this.background.init(0, 0); // Set draw point to 0,0

      // Initialize the ship object
      this.ship = new Ship();
      // Set the ship to start near the bottom middle of the canvas
      var shipStartX = this.shipCanvas.width / 2 - imageRepository.spaceship.width;
      var shipStartY = 0;
      this.ship.init(shipStartX, shipStartY, imageRepository.spaceship.width, imageRepository.spaceship.height);
      
      return true;
    } else {
      return false;
    }
  };

  // Start the animation loop
  this.start = function () {
    this.ship.draw();
    animate();
  };
}

/**
 * The animation loop. Calls the requestAnimationFrame shim to
 * optimize the game loop and draws all game objects. This
 * function must be a gobal function and cannot be within an
 * object.
 */
function animate() {
  requestAnimFrame(animate);
  game.background.draw();
  game.ship.move();
}

/** The keycodes that will be mapped when a user presses a button.
 * Original code by Doug McInnes
 */
KEY_CODES = {
  37: "left",
  39: "right",
  80: "pause",
}

/** Creates the array to hold the KEY_CODES and sets all their values
 * to false. Checking true/flase is the quickest way to check status
 * of a key press and which one was pressed when determining
 * when to move and which direction.
 */
KEY_STATUS = {};
for (code in KEY_CODES) {
  KEY_STATUS[KEY_CODES[code]] = false;
}
/**
 * Sets up the document to listen to onkeydown events (fired when
 * any key on the keyboard is pressed down). When a key is pressed,
 * it sets the appropriate direction to true to let us know which
 * key it was.
 */
document.onkeydown = function (e) {
  // Firefox and opera use charCode instead of keyCode to
  // return which key was pressed.
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = true;
    
    if (e.keyCode === 80) { // p
      if (paused) {
        document.getElementById("pause-menu").style.display = "none";
        document.getElementById("pause-menu-screen-darken").style.display = "none";

      } else{
        document.getElementById("pause-menu").style.display = "block";
        document.getElementById("pause-menu-screen-darken").style.display = "block";
      }
      paused = !paused;
    }
  }
}

/**
 * Sets up the document to listen to ownkeyup events (fired when
 * any key on the keyboard is released). When a key is released,
 * it sets teh appropriate direction to false to let us know which
 * key it was.
 */
document.onkeyup = function (e) {
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = false;
  }
}

/**	
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop, 
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function ( /* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

/**
 * This where the variables and declarations of the working
 * scoreboard, life system, and levels are. They are variables in javascript 
 * and can be updated as such, allowing a user to progress through the game.
 */
var currentLives;
var currentScore;
var currentLevel;

var difficulty;

/**
 * Sets the difficulty of the game. Also activates selection on buttons.
 */
var selectEasy = false;
var selectMedium = false;
var selectHard = false;

function setDifficulty(diff) {
  //easy
  if (diff == 1) {
    difficulty = 1;
    
    if (selectEasy == false) {
      document.getElementById("easy").className = "button-selected";
      document.getElementById("medium").className = "button";
      document.getElementById("hard").className = "button";
      selectEasy = true;
      selectMedium = false;
      selectHard = false;
    } else {
      document.getElementById("easy").className = "button";
      document.getElementById("medium").className = "button";
      document.getElementById("hard").className = "button";
      selectEasy = false;
      selectMedium = false;
      selectHard = false;
    }
  } else if (diff == 3) { //hard
    difficulty = 3;
    
    if (selectHard == false) {
      document.getElementById("easy").className = "button";
      document.getElementById("medium").className = "button";
      document.getElementById("hard").className = "button-selected";
      selectEasy = false;
      selectMedium = false;
      selectHard = true;
    } else {
      document.getElementById("easy").className = "button";
      document.getElementById("medium").className = "button";
      document.getElementById("hard").className = "button";
      selectEasy = false;
      selectMedium = false;
      selectHard = false;
    }
  } else { //medium (default difficulty)
    difficulty = 2;
    currentLevel = "Medium";
    document.getElementById("level-counter").innerHTML = "Level: " + currentLevel;
    if (selectMedium == false) {
      document.getElementById("easy").className = "button";
      document.getElementById("medium").className = "button-selected";
      document.getElementById("hard").className = "button";
      selectEasy = false;
      selectMedium = true;
      selectHard = false;
    } else {
      document.getElementById("easy").className = "button";
      document.getElementById("medium").className = "button";
      document.getElementById("hard").className = "button";
      selectEasy = false;
      selectMedium = false;
      selectHard = false;
    }
  }
  document.getElementById("difficulty-menu").style.display = "none";
}

/**
 * Pauses the game.
 */
function pause() {
  paused = true;
  document.getElementById("pause-menu").style.display = "block";
  document.getElementById("pause-menu-screen-darken").style.display = "block";
}

/**
 * Resumes the game.
 */
function resume() {
  paused = false;
  document.getElementById("pause-menu").style.display = "none";
  document.getElementById("pause-menu-screen-darken").style.display = "none";
}

function goToLeaderboard() {
  document.location.href = 'leaderboard.html';
}

function goToMainMenu() {
  document.location.href = 'index.html';
}