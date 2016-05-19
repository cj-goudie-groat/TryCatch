/**
 * Loads all of the sounds.
 */
function loadSounds() {
  /**
   * Sound effects
   */
  createjs.Sound.registerSound("sounds/button.mp3", "buttonSound"); //added 
  createjs.Sound.registerSound("sounds/collectionsound.mp3", "correctElementSound"); //added
  createjs.Sound.registerSound("sounds/errorsound.mp3", "wrongElementSound"); //added
  createjs.Sound.registerSound("sounds/gameover.mp3", "gameOverSound"); // added
  createjs.Sound.registerSound("sounds/natesound1.mp3", "bonus1"); // added
  createjs.Sound.registerSound("sounds/natesound2.mp3", "bonus2"); // added
  createjs.Sound.registerSound("sounds/natesound3.mp3", "bonus3"); // added
  createjs.Sound.registerSound("sounds/wordsound.mp3", "correctWord"); //added
  /**
   * Music
   */
  createjs.Sound.registerSound("sounds/button.mp3", "bonusMusic"); // NOT EXIST YET
  createjs.Sound.registerSound("sounds/spacesound.mp3", "gameMusic"); // added
  createjs.Sound.registerSound("sounds/mainmenusound.mp3", "menuMusic"); //
}


/**
 * Plays the button click sound, mutes sound on mute button click
 */
$(document).ready(function () {
  $(".button").click(function () {
  if (!muteSound) {
    createjs.Sound.play("buttonSound");
  }
  });
  
  $(".button-selected").click(function () {
    createjs.Sound.play("buttonSound");
  });
  
  $(".available").click(function () {
    createjs.Sound.play("buttonSound");
  });
  
  $("#mute-button").click(function () {
    if (!muteSound) {
      document.getElementById("mute-button").innerHTML = "Unmute Sound";
      createjs.Sound.stop("gameMusic");
      createjs.Sound.stop("menuMusic");
    } else {
      document.getElementById("mute-button").innerHTML = "Mute Sound";
      if (paused) {
        createjs.Sound.play("gameMusic", {interrupt: createjs.Sound.INTERRUPT_ANY, loop:-1});
      } else {
        createjs.Sound.play("menuMusic", {interrupt: createjs.Sound.INTERRUPT_ANY, loop:-1});
      }
    }
    muteSound = !muteSound;
  });
});

window.onload = function () {
  loadSounds();
  playMenuMusic();
};