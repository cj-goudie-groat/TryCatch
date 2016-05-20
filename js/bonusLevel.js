/**
 * Starts the bonus level and lasts for [bonusLength]ms.
 */
function bonusLevel() {
  game.elementContext.clearRect(0, 0, game.elementCanvas.width, game.elementCanvas.height);
  
  spellingMusic.loop(false);
  spellingMusic.fadeOut(0, 1000);
  
  /*
  bonusMusic.loop(true);
  bonusMusic.fadeIn(1, 2000);
  */
  
  // Update player model
  game.player.draw();
  // Wait for [bonusLength]ms to end bonus level
  setTimeout(function() {
    stopBonusLevel();
  }, bonusLength);
}

function stopBonusLevel() {
  bonusActive = false;
  
  /*
  bonusMusic.loop(false);
  bonusMusic.fadeOut(0, 1000);
  */
  
  spellingMusic.loop(true);
  spellingMusic.play(1, 2000);
  
  game.elementContext.clearRect(0, 0, game.elementCanvas.width, game.elementCanvas.height);
  // Update player model
  game.player.draw();
    
  for (var i = 0; i < bonusAmount; i++) {
    bonusItems[i].x = Math.floor(Math.random() * (game.elementCanvas.width - bonusWidth));
    bonusItems[i].y = Math.floor(Math.random() * (game.elementCanvas.height - bonusHeight) * -1);
  }
    
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