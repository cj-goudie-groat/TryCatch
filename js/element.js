/**
 * Create the Element object of the falling elements. The elements are
 * drawn on the "elements" canvas and uses dirty rectangles to move
 * around the screen.
 */
function Element() {
  if (difficulty == 1) { // Easy
    if (window.innerWidth >= 550) {
      this.speed = 3;
    } else {
      this.speed = 2;
    }
  } else if (difficulty == 3) { // Hard
    if (window.innerWidth >= 550) {
      this.speed = 8;
    } else {
      this.speed = 6;
    }
  } else { // Medium (default)
    if (window.innerWidth >= 550) {
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
    // Spawn letters that are in the current word more frequently
    var randGen = Math.floor(Math.random() * 30);
    if (randGen % 3 == 0) {
      var randIndex = Math.floor(Math.random() * wordLength);
      var randomLetter = currentWord.charCodeAt(randIndex);
    } else {
      var randomLetter = Math.floor(Math.random() * (122 - 97 + 1)) + 97; // Random letter from a-z
    }
    // Spawn larger letters for larger screen and smaller letters for smaller screen
    if (window.innerWidth >= 550) {
      elements[index].img.src = "images/spelling/letters/"
        + String.fromCharCode(randomLetter).toLowerCase() + ".png";
    } else {
      elements[index].img.src = "images/spelling/lettersmobile/"
        + String.fromCharCode(randomLetter).toLowerCase() + ".png";
    }
    elements[index].character = String.fromCharCode(randomLetter).toUpperCase(); // A-Z
  } else if (gamemode == "math") {
    var randomNumber = Math.floor(Math.random() * 13); // Random number from 0-12
    if (randomNumber == 10) { // + (add)
      if (window.innerWidth >= 550) {
        elements[index].img.src = "images/math/numbers/+.png";
      } else {
        elements[index].img.src = "images/math/numbersmobile/+.png";
      }
      elements[index].character = "+";
    } else if (randomNumber == 11) { // - (subtract)
      if (window.innerWidth >= 550) {
        elements[index].img.src = "images/math/numbers/-.png";
      } else {
        elements[index].img.src = "images/math/numbersmobile/-.png";
      }
      elements[index].character = "-";
    } else if (randomNumber == 12) { // = (equals)
      if (window.innerWidth >= 550) {
        elements[index].img.src = "images/math/numbers/=.png";
      } else {
        elements[index].img.src = "images/math/numbersmobile/=.png";
      }
      elements[index].character = "=";
    } else { // 0-9
      if (window.innerWidth >= 550) {
        elements[index].img.src = "images/math/numbers/" + randomNumber + ".png";
      } else {
        elements[index].img.src = "images/math/numbersmobile/" + randomNumber + ".png";
      }
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