/**
 * Create the Element object of the falling elements. The elements are
 * drawn on the "elements" canvas and uses dirty rectangles to move
 * around the screen.
 */
function SpecialElement() {
  this.speed = specialSpeed;
  
  this.img = new Image();
  this.character = "";
  
  /**
   * Calls checkCollision(), makes special items move, 
   * checks if they're off the screen, and then calls
   * newSpecialItem() to spawn a new random special item
   * once every 15 - 30 seconds.
   */
  this.move = function () {
  	// Stops the elemends from moving when paused!
    if (paused || bonusActive) {
      return;
    }
    
    clearSpecial();
    checkCollision(null, specialElement.character);

    if (specialSpawned) {
      game.elementContext.drawImage(specialElement.img, specialElement.x, specialElement.y);
      specialElement.y += specialSpeed;
    }

    if (specialElement.y > game.elementCanvas.height) {
      specialElement.y = 0;
      specialSpawned = false;
      specialSpawnTimer = Math.floor(Math.random() * 30000) + 60000; // Spawn every 60 - 90 seconds
      setTimeout(function () {
        specialSpawned = true;
        newSpecialItem();
      }, specialSpawnTimer);
    }
  };
}
SpecialElement.prototype = new Drawable();

/**
 * Clears the canvas [specialSpeed]px above the special items sprites to remove trails.
 */
function clearSpecial() {
  game.elementContext.clearRect(specialElement.x, specialElement.y - specialSpeed, specialWidth, specialHeight);
  game.elementContext.clearRect(0, game.elementCanvas.height - specialSpeed, game.elementCanvas.width, specialSpeed);
}

/**
 * The special item image will be replaced with a new
 * special item, and spawn at a random height above the screen.
 */
function newSpecialItem() {
  var index = Math.floor(Math.random() * specialAmount);
  specialElement.x = Math.floor(Math.random() * (game.elementCanvas.width - specialWidth * 3)) + specialWidth;
  specialElement.y = Math.floor(Math.random() * (game.elementCanvas.height - specialHeight) * -1);
  if (index == 0) { // Easter egg
    specialElement.img.src = "images/special/easteregg.png";
    specialElement.character = "egg";
  } else { // Extra life
    specialElement.img.src = "images/special/extralife.png";
    specialElement.character = "life";
  }
}