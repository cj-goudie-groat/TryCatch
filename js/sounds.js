/**
 * Loads all of the sounds.
 */
function loadSounds() {
  createjs.Sound.registerSound("sounds/button.mp3", "buttonSound"); //added 
  createjs.Sound.registerSound("sounds/collectionsound.mp3", "correctElementSound"); //
  createjs.Sound.registerSound("sounds/errorsound.mp3", "wrongElementSound"); //
  createjs.Sound.registerSound("sounds/mainmenusound.mp3", "menuMusic"); //
  createjs.Sound.registerSound("sounds/gameover.mp3", "gameOverSound"); //
  createjs.Sound.registerSound("sounds/button.mp3", "bonusCollectionSound"); //
  createjs.Sound.registerSound("sounds/button.mp3", "bonusMusic"); //
  createjs.Sound.registerSound("sounds/button.mp3", "gameMusic"); //
  createjs.Sound.registerSound("sounds/button.mp3", "correctWord"); //
}

/**
 * Plays the menu selection sound
 */
$(document).ready(function () {
  $(".button").click(function () {
    createjs.Sound.play("buttonSound");
  });
});

/**
 * Plays the menu selection sound
 */
$(document).ready(function () {
  $(".button-selected").click(function () {
    createjs.Sound.play("buttonSound");
  });
});

/**
 * Plays the menu selection sound
 */
$(document).ready(function () {
  $(".available").click(function () {
    createjs.Sound.play("buttonSound");
  });
});

window.onload = loadSounds();