var game = new Game();
var wrapper = document.getElementById("wrapper");

/**
 * Initializes the Game and starts it.
 */
function init() {
  if (game.init()) {
    game.start();
    currentLives = 5;
    currentScore = 0;
    document.getElementById("score-counter").innerHTML = "" + currentScore;
  }
}

/**
 * Define an object to hold all our images for the game so images
 * are only ever created once. This type of object is known as a 
 * singleton.
 */
var imageRepository = new function () {	
  // Define images
  this.background1 = new Image();
  this.background2 = new Image();
  this.background3 = new Image();
  
  this.mathBg1 = new Image();
  this.mathBg2 = new Image();
  this.mathBg3 = new Image();
  
  this.player = new Image();
  this.mathPlayer = new Image();
  
  this.bonusLevelBg = new Image();
  this.bonusLevelPlayer = new Image();
  this.easterEgg = new Image();
  this.extralife = new Image();
  
  // Ensure all images have loaded before starting the game
  var numImages = 12;
  var numLoaded = 0;

  function imageLoaded() {
    numLoaded++;
    if (numLoaded === numImages) {
      window.init();
    }
  }
  
  this.background1.onload = function () {
    imageLoaded();
  }
  
  this.background2.onload = function () {
    imageLoaded();
  }
  
  this.background3.onload = function () {
    imageLoaded();
  }
  
  this.mathBg1.onload = function () {
    imageLoaded();
  }
  
  this.mathBg2.onload = function () {
    imageLoaded();
  }
  
  this.mathBg3.onload = function () {
    imageLoaded();
  }
  
  this.player.onload = function () {
    imageLoaded();
  }
  
  this.mathPlayer.onload = function () {
    imageLoaded();
  }
  
  this.bonusLevelBg.onload = function () {
    imageLoaded();
  }
  
  this.bonusLevelPlayer.onload = function () {
    imageLoaded();
  }
  
  this.easterEgg.onload = function () {
    imageLoaded();
  }
  
  this.extralife.onload = function () {
    imageLoaded();
  }

  // Set images src
  this.background1.src = "images/spelling/background/layer1.png";
  this.background2.src = "images/spelling/background/layer2.png";
  this.background3.src = "images/spelling/background/layer3.png";
  
  this.mathBg1.src = "images/math/background/layer1.png";
  this.mathBg2.src = "images/math/background/layer2.png";
  this.mathBg3.src = "images/math/background/layer3.png";
  
  if (window.innerWidth >= 550) {
    this.player.src = "images/spelling/ship.png";
    this.mathPlayer.src = "images/math/crab.png";
    this.bonusLevelPlayer.src = "images/special/bonusplayer.png";
  } else {
    this.player.src = "images/spelling/shipmobile.png";
    this.mathPlayer.src = "images/math/crabmobile.png";
    this.bonusLevelPlayer.src = "images/special/bonusplayermobile.png";
  }
  
  this.bonusLevelBg.src = "images/special/bonusbg.jpg";
  this.easterEgg.src = "images/special/easteregg.png";
  this.extralife.src = "images/special/extralife.png";
};

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
    this.bgCanvas = document.getElementById("background");
    this.playerCanvas = document.getElementById("player");
    this.elementCanvas = document.getElementById("elements");
    // Test to see if canvas is supported. Only need to
    // check one canvas
    if (this.bgCanvas != null) {
      this.bgContext = this.bgCanvas.getContext("2d");
      this.playerContext = this.playerCanvas.getContext("2d");
      this.elementContext = this.elementCanvas.getContext("2d");
      // Initialize objects to contain their context and canvas
      // information
      Background1.prototype.context = this.bgContext;
      Background1.prototype.canvasWidth = this.bgCanvas.width;
      Background1.prototype.canvasHeight = imageRepository.background1.height;
      
      Background2.prototype.context = this.bgContext;
      Background2.prototype.canvasWidth = this.bgCanvas.width;
      Background2.prototype.canvasHeight = imageRepository.background2.height;
      
      Background3.prototype.context = this.bgContext;
      Background3.prototype.canvasWidth = this.bgCanvas.width;
      Background3.prototype.canvasHeight = imageRepository.background3.height;
      
      Player.prototype.context = this.playerContext;
      Player.prototype.canvasWidth = this.playerCanvas.width;
      Player.prototype.canvasHeight = this.playerCanvas.height;
      
      Element.prototype.context = this.elementContext;
      Element.prototype.canvasWidth = this.elementCanvas.width;
      Element.prototype.canvasHeight = this.elementCanvas.height;
      
      SpecialElement.prototype.context = this.elementContext;
      SpecialElement.prototype.canvasWidth = this.elementCanvas.width;
      SpecialElement.prototype.canvasHeight = this.elementCanvas.height;
      
      BonusElement.prototype.context = this.elementContext;
      BonusElement.prototype.canvasWidth = this.elementCanvas.width;
      BonusElement.prototype.canvasHeight = this.elementCanvas.height;
      
      // Initialize the background object
      this.background1 = new Background1();
      this.background1.init(0, 0); // Set draw point to 0,0
      
      this.background2 = new Background2();
      this.background2.init(0, 0); // Set draw point to 0,0
      
      this.background3 = new Background3();
      this.background3.init(0, 0); // Set draw point to 0,0
      
      // Initialize the player object
      this.player = new Player();
      // Set the player to start near the bottom middle of the canvas
      var playerStartX = this.playerCanvas.width / 2 - imageRepository.player.width;
      var playerStartY = 0;
      this.player.init(playerStartX, playerStartY, imageRepository.player.width, imageRepository.player.height);
      
      // Initialize the falling element objects
      this.element = new Element();
      this.element.init(0, 0, elementWidth, elementHeight);
      
      // Initialize the special element objects
      this.specialItem = new SpecialElement();
      this.specialItem.init(0, 0, specialWidth, specialHeight);
      
      // Initialize the bonus element objects
      this.bonusItem = new BonusElement();
      this.bonusItem.init(0, 0, bonusWidth, bonusHeight);
      
      return true;
    } else {
      return false;
    }
  };

  // Start the animation loop
  this.start = function () {
    this.player.draw();
  };
}

/**
 * The animation loop. Calls the requestAnimationFrame shim to
 * optimize the game loop and draws all game objects. This
 * function must be a gobal function and cannot be within an
 * object.
 */
function animate() {
  game.background3.draw();
  game.background2.draw();
  game.background1.draw();
  game.player.move();
  game.element.move();
  game.specialItem.move();
  game.bonusItem.move();
  requestAnimFrame(animate);
}