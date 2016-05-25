/**
 * Creates the Background object which will become a child of
 * the Drawable object. The background is drawn on the "background"
 * canvas and creates the illusion of moving by panning the image.
 */

// Top layer for panning
function Background1() {
  this.speed = 0; // Redefine speed of the background for panning

  // Implement abstract function 
  this.draw = function () {

    //pauses the background
    if (paused) {
      return;
    }

    if (bonusActive) {
      this.context.drawImage(imageRepository.bonusLevelBg, 0, 0);
    } else {
      // Pan background
      this.context.drawImage(imageRepository.mathBackground1, this.x, this.y);

      this.y += this.speed;
      // Draw another image at the top edge of the first image
      this.context.drawImage(imageRepository.mathBackground1, this.x, this.y - this.canvasHeight);

      // If the image scrolled off the screen, reset
      if (this.y >= this.canvasHeight) {
        this.y = 0;
      }
    }
  }
};
// Set Background to inherit properties from Drawable
Background1.prototype = new Drawable();

// Second layer for panning
function Background2() {
  this.speed = 1; // Redefine speed of the background for panning

  // Implement abstract function 
  this.draw = function () {

    //pauses the background
    if (paused) {
      return;
    }
    // Pan background
    this.context.drawImage(imageRepository.mathBackground2, this.x, this.y);

    this.x += this.speed;
    
    // Draw another image at the top edge of the first image
    this.context.drawImage(imageRepository.mathBackground2, this.x - this.canvasWidth, this.y);

    // If the image scrolled off the screen, reset
    if (this.x >= this.canvasWidth) {
      this.x = 0;
    }
  }
};
// Set Background to inherit properties from Drawable
Background2.prototype = new Drawable();

function Background3() {
  this.speed = 0.5; // Redefine speed of the background for panning

  // Implement abstract function 
  this.draw = function () {

    //pauses the background
    if (paused) {
      return;
    }
    // Pan background
    this.context.drawImage(imageRepository.mathBackground3, this.x, this.y);

    this.x += this.speed;
    // Draw another image at the top edge of the first image
    this.context.drawImage(imageRepository.mathBackground3, this.x - this.canvasWidth, this.y);

    // If the image scrolled off the screen, reset
    if (this.x >= this.canvasWidth) {
      this.x = 0;
    }
  }
};
// Set Background to inherit properties from Drawable
Background3.prototype = new Drawable();