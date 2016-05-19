/**
 * Checks for a collision between the player and an element.
 */
function checkCollision(i, character) {
  var playerRect = {
    x: game.player.x,
    y: game.player.y,
    widthOffset: 0.4 * imageRepository.player.width,
    heightOffset: 0.33 * imageRepository.player.height,
    width: imageRepository.player.width,
    height: imageRepository.player.height
  };
  
  if (character == "@") { // Bonus level element
    var bonusRect = {
      x: bonusItems[i].x,
      y: bonusItems[i].y,
      width: bonusWidth,
      height: bonusHeight
    };
    
    if (playerRect.x + playerRect.widthOffset < bonusRect.x + bonusRect.width &&
        playerRect.x + (playerRect.width - playerRect.widthOffset) > bonusRect.x &&
        (window.innerHeight - playerRect.height) < bonusRect.y + bonusRect.height &&
        playerRect.heightOffset + (window.innerHeight - playerRect.height) > bonusRect.y) {
      
      currentScore += 50;
      document.getElementById("score-counter").innerHTML = "" + currentScore;
      newBonusItem(i);
    }
  } else if (i == null) { // Easter egg element
    var specialRect = {
      x: specialElement.x,
      y: specialElement.y,
      width: specialWidth,
      height: specialHeight
    };
    
    if (playerRect.x + playerRect.widthOffset < specialRect.x + specialRect.width &&
      playerRect.x + (playerRect.width - playerRect.widthOffset) > specialRect.x &&
      (window.innerHeight - playerRect.height) < specialRect.y + specialRect.height &&
      playerRect.heightOffset + (window.innerHeight - playerRect.height) > specialRect.y) {
      
      if (character == "egg") {
        bonusInit();
      } else if (character == "life") {
        if (currentLives < 5) {
          currentLives++;
          updateLives();
        }
      }
      specialSpawned = false;
      newSpecialItem();
      specialSpawnTimer = Math.floor(Math.random() * 15000) + 15000; 
      setTimeout(function () {
        specialSpawned = true;
      }, specialSpawnTimer);
    }
  } else { // Regular element
    var elementRect = {
      x: elements[i].x,
      y: elements[i].y,
      width: elementWidth,
      height: elementHeight
    };
    
    if (playerRect.x + playerRect.widthOffset < elementRect.x + elementRect.width &&
        playerRect.x + (playerRect.width - playerRect.widthOffset) > elementRect.x &&
        (window.innerHeight - playerRect.height) < elementRect.y + elementRect.height &&
        playerRect.heightOffset + (window.innerHeight - playerRect.height) > elementRect.y) {
      
      if (gamemode == "spelling") {
        letterCollision(character);
      }
      newElement(i);
    }
  }
}