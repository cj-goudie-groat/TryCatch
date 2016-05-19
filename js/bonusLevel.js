/**
 * Starts the bonus level and lasts for [bonusLength]ms.
 */
function bonusLevel() {
  game.elementContext.clearRect(0, 0, game.elementCanvas.width, game.elementCanvas.height);
  if (!muteSound) {
    createjs.Sound.stop("gameMusic");
    //createjs.Sound.play("bonusMusic");
  }
  // Update player model
  game.player.draw();
  // Wait for [bonusLength]ms to end bonus level
  setTimeout(function() {
    stopBonusLevel();
    if (!muteSound) {
      //createjs.Sound.stop("bonusMusic");
      createjs.Sound.play("gameMusic", {interrupt: createjs.Sound.INTERRUPT_ANY, loop:-1});
    }
  }, bonusLength);
}

function stopBonusLevel() {
  bonusActive = false;
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