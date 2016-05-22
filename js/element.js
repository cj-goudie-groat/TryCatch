/**
 * Create the Element object of the falling elements. The elements are
 * drawn on the "elements" canvas and uses dirty rectangles to move
 * around the screen.
 */
function Element() {
  if (difficulty == 1) { // Easy
    if (window.innerWidth) {
      this.speed = 3;
    } else {
      this.speed = 1;
    }
  } else if (difficulty == 3) { // Hard
    if (window.innerWidth) {
      this.speed = 8;
    } else {
      this.speed = 6;
    }
  } else { // Medium (default)
    if (window.innerWidth) {
      this.speed = 6;
    } else {
      this.speed = 4;
    }
  }
  
  this.img = new Image();
  this.img.src = "";
  this.character = "";
  
  /**
   * Calls checkCollision(), makes elements move, 
   * checks if they're off the screen, and then calls
   * newElement() to spawn a new random element.
   */
  this.move = function () {
  	// Stops the elements from moving when paused!
    if (paused || bonusActive) {
      return;
    }
  
    clearElement();
    for (var i = 0; i < elementAmount; i++) {
      checkCollision(i, elements[i].character);
      game.elementContext.drawImage(elements[i].img, elements[i].x, elements[i].y);
      elements[i].y += elementSpeed;

      if (elements[i].y > game.elementCanvas.height) {
        newElement(i);
      }
    }
  };
}
Element.prototype = new Drawable();

/**
 * Clears the canvas [elementSpeed]px above the elements sprites to remove trails.
 */
function clearElement() {
  for (var i = 0; i < elementAmount; i++) {
    game.elementContext.clearRect(elements[i].x, elements[i].y - elementSpeed, elementWidth, elementHeight);
  }
  game.elementContext.clearRect(0, game.elementCanvas.height - elementSpeed, game.elementCanvas.width, elementSpeed);
}

/**
 * The element image will be replaced with a new element,
 * and spawn at a random height above the screen
 */
function newElement(index) {
  elements[index].x = Math.floor(Math.random() * (game.elementCanvas.width - elementWidth));
  elements[index].y = Math.floor(Math.random() * (game.elementCanvas.height + elementHeight) * -1);
  if (gamemode == "spelling") {
    var randomLetter = Math.floor(Math.random() * (122 - 97 + 1)) + 97; // Random letter from a-z
    elements[index].img.src = "images/letters/" + String.fromCharCode(randomLetter) + ".png";
    elements[index].character = String.fromCharCode(randomLetter).toUpperCase(); // A-Z
  } else if (gamemode == "math") {
    var randomNumber = Math.floor(Math.random() * 12); // Random number from 0-11
    if (randomNumber == 10) { // + (add)
      elements[index].img.src = "images/numbers/+.png";
      elements[index].character = "+";
    } else if (randomNumber == 11) { // - (subtract)
      elements[index].img.src = "images/numbers/-.png";
      elements[index].character = "-";
    } else { // 0-9
      elements[index].img.src = "images/numbers/" + randomNumber + ".png";
      elements[index].character = randomNumber;
    }
  }
  
  // Check for collision with other elements
  for (var i = 0; i < elementAmount; i++) {
    if (i == index) {
      i++;
    } else {
      while (elements[index].x < elements[i].x + elementWidth &&
            elements[index].x + elementWidth > elements[i].x &&
            elements[index].y < elements[i].y + elementHeight &&
            elements[index].y + elementHeight > elements[i].y) {
        
        // Move spwan position if there is a collision
        elements[index].y = Math.floor(Math.random() * (game.elementCanvas.height + elementHeight) * -1);
      }
    }
  }
}