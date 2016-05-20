/**
 * Loads all of the sounds.
 */
function loadSounds() {
  /**
   * Sound effects
   */
  createjs.Sound.registerSound("sounds/button.mp3", "buttonSound");
  createjs.Sound.registerSound("sounds/collectionsound.mp3", "correctElementSound");
  createjs.Sound.registerSound("sounds/errorsound.mp3", "wrongElementSound");
  createjs.Sound.registerSound("sounds/gameover.mp3", "gameOverSound");
  createjs.Sound.registerSound("sounds/natesound1.mp3", "bonus1");
  createjs.Sound.registerSound("sounds/natesound2.mp3", "bonus2");
  createjs.Sound.registerSound("sounds/natesound3.mp3", "bonus3");
  createjs.Sound.registerSound("sounds/natesound4.mp3", "bonus4"); // Does not exist yet
  createjs.Sound.registerSound("sounds/wordsound.mp3", "correctWord");
  /**
   * Music
   */
  createjs.Sound.registerSound("sounds/bonusgamesound.mp3", "bonusMusic"); // Does not exist yet
  createjs.Sound.registerSound("sounds/spacesound.mp3", "gameMusic");
  createjs.Sound.registerSound("sounds/mainmenusound.mp3", "menuMusic"); //Not functioning entirely
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
      createjs.Sound.play("menuMusic", {interrupt: createjs.Sound.INTERRUPT_ANY, loop:-1});
    }
    muteSound = !muteSound;
  });
  
  $("#mute-button1").click(function () {
    if (!muteSound) {
      document.getElementById("mute-button1").innerHTML = "Unmute Sound";
      createjs.Sound.stop("gameMusic");
      createjs.Sound.stop("menuMusic");
    } else {
      document.getElementById("mute-button1").innerHTML = "Mute Sound";
      createjs.Sound.play("gameMusic", {interrupt: createjs.Sound.INTERRUPT_ANY, loop:-1});
    }
    muteSound = !muteSound;
  });
  
});

window.onload = function () {
  loadSounds();
  playMenuMusic();
};