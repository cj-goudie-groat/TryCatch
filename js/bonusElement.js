/**
 * Create the Element object of the bonus elements. The elements are
 * drawn on the "elements" canvas and uses dirty rectangles to move
 * around the screen.
 */
function BonusElement() {
  this.speed = bonusSpeed;
  this.img = new Image();
  this.character = "";
  
  /**
   * Calls checkCollision(), makes bonus items move, 
   * checks if they're off the screen, and then calls
   * newBonusItem() to spawn a new bonus item.
   */
  this.move = function () {
  	// Stops the elements from moving when paused!
    if (paused || !bonusActive) {
      return;
    }
  
    clearBonus();
    for (var i = 0; i < bonusAmount; i++) {
      checkCollision(i, bonusItems[i].character);
      game.elementContext.drawImage(bonusItems[i].img, bonusItems[i].x, bonusItems[i].y);
      bonusItems[i].y += bonusSpeed;
      if (bonusItems[i].y > game.elementCanvas.height) {
        newBonusItem(i);
      }
    }
  };
}
BonusElement.prototype = new Drawable();

/**
 * Clears the elementCanvas [bonusSpeed]px above the letter sprites to remove trails.
 */
function clearBonus() {
  for (var i = 0; i < bonusAmount; i++) {
    game.elementContext.clearRect(bonusItems[i].x, bonusItems[i].y - bonusSpeed, bonusWidth, bonusHeight);
  }
  game.elementContext.clearRect(0, game.elementCanvas.height - bonusSpeed, game.elementCanvas.width, bonusSpeed);
}

/**
 * Spawns a new bonus item to drop.
 */
function newBonusItem(index) {
  bonusItems[index].x = Math.floor(Math.random() * (game.elementCanvas.width - bonusWidth));
  bonusItems[index].y = Math.floor(Math.random() * (game.elementCanvas.height - bonusHeight) * -1);
  
  // Sets size of bonus elements based on screen size
  if (window.innerWidth >= 550) {
    bonusItems[index].img.src = "images/special/bonus.png";
  } else {
    bonusItems[index].img.src = "images/special/bonusmobile.png";
  }
  bonusItems[index].character = "@";
}