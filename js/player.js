/**
 * Create the Player object that the player controls. The player is
 * drawn on the "player" canvas and uses dirty rectangles to move
 * around the screen.
 */
function Player() {
  if (window.innerWidth >= 550) {
    this.speed = 10;
  } else {
    this.speed = 5;
  }
  
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
      this.context.drawImage(imageRepository.player, this.x, this.y);
    }
  };
  
  this.move = function () {
  	// Stops the player from moving when paused!
    if (paused) {
      return;
	};
    
    // Determine if the action is move action
    if (KEY_STATUS.left || KEY_STATUS.right) {
      // The player moved, so erase it's current image so it can
      // be redrawn in it's new location
      this.context.clearRect(this.x, this.y, this.width, this.height);

      // Update x and y according to the direction to move and
      // redraw the player. Change the else if's to if statements
      // to have diagonal movement.
      if (KEY_STATUS.left) {
        this.x -= this.speed
        
        if (this.x <= 0) { // Keep player within the screen
          this.x = 0;
        }
        
      } else if (KEY_STATUS.right) {
        this.x += this.speed
        
        if (this.x >= this.canvasWidth - this.width) {
          this.x = this.canvasWidth - this.width;
        }
      }
      this.draw();
    }
  };
}
Player.prototype = new Drawable();