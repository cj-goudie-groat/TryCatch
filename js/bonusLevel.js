/**
 * Starts the bonus level and lasts for [bonusLength]ms.
 */
function bonusLevel() {
  game.elementContext.clearRect(0, 0, game.elementCanvas.width, game.elementCanvas.height);
  
  // Checks the gamemode and stops the music
  if (gamemode == "spelling") {
    spellingMusic.loop(false);
    spellingMusic.fadeOut(0, 1000);
  } else if (gamemode == "math") {
    mathMusic.loop(false);
    mathMusic.fadeOut(0, 1000);
  }
  
  // Plays the bonus level music
  bonusMusic.loop(true);
  bonusMusic.fadeIn(1, 2000);
  
  // Update player model
  game.player.draw();
  // Wait for [bonusLength]ms to end bonus level
  setTimeout(function() {
    stopBonusLevel();
  }, bonusLength);
}

/**
 * Stops the bonus level and returns to normal gamemode.
 */
function stopBonusLevel() {
  bonusActive = false;
  
  // Stops the bonus level music
  bonusMusic.loop(false);
  bonusMusic.fadeOut(0, 1000);
  
  // Checks the gamemode and plays the music
  if (gamemode == "spelling") {
    spellingMusic.loop(true);
    spellingMusic.fadeIn(1, 2000);
  } else if (gamemode == "math") {
    mathMusic.loop(true);
    mathMusic.fadeIn(1, 2000);
  }
  
  game.elementContext.clearRect(0, 0, game.elementCanvas.width, game.elementCanvas.height);
  // Update player model
  game.player.draw();
  
  // Sets the bonus elements back to the top.
  for (var i = 0; i < bonusAmount; i++) {
    bonusItems[i].x = Math.floor(Math.random() * (game.elementCanvas.width - bonusWidth));
    bonusItems[i].y = Math.floor(Math.random() * (game.elementCanvas.height - bonusHeight) * -1);
  }
  
  // Spawns new elements to fall
  for (var i = 0; i < elementAmount; i++) {
    newElement(i);
  }
    
  specialSpawned = false;
  specialSpawnTimer = Math.floor(Math.random() * 30000) + 60000; // Spawn 60 - 90 seconds after bonus level
  setTimeout(function () {
    specialSpawned = true;
    newSpecialItem();
  }, specialSpawnTimer);
}

/**
 * Fills the array for bonus elements.
 */
function bonusInit() {
  bonusActive = true;
  // Fill bonus level items array
  for (var i = 0; i < bonusAmount; i++) {
    bonusItems[i].img.src = "images/special/bonus.png";
    bonusItems[i].character = '@';
    newBonusItem(i);
  }
  
  // Start the bonus level
  bonusLevel();
}