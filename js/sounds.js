/**
 * Loads all of the sounds.
 */
function loadSounds() {
  createjs.Sound.registerSound("sounds/button.mp3", "buttonSound"); //added 
  createjs.Sound.registerSound("sounds/collectionsound.mp3", "correctElementSound"); //added
  createjs.Sound.registerSound("sounds/errorsound.mp3", "wrongElementSound"); //added
  createjs.Sound.registerSound("sounds/mainmenusound.mp3", "menuMusic"); //
  createjs.Sound.registerSound("sounds/gameover.mp3", "gameOverSound"); //
  createjs.Sound.registerSound("sounds/natesound1.mp3", "bonus1"); //
  createjs.Sound.registerSound("sounds/natesound2.mp3", "bonus2"); //
  createjs.Sound.registerSound("sounds/natesound3.mp3", "bonus3"); //
  createjs.Sound.registerSound("sounds/button.mp3", "bonusMusic"); // NOT EXIST YET
  createjs.Sound.registerSound("sounds/spacesound.mp3", "gameMusic"); //
  createjs.Sound.registerSound("sounds/wordsound.mp3", "correctWord"); //added
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