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

  // Define abstract function to be implemented in child objects
  this.draw = function () {};
  this.move = function () {};
}