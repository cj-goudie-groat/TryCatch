/**
 * Sound effect variables.
 */
var buttonSound = new Howl ({
  urls: ["sounds/button.mp3"]
});

var correctElementSound = new Howl ({
  urls: ["sounds/collectionsound.mp3"]
});

var correctAnswerSound = new Howl ({
  urls: ["sounds/answersound.mp3"]
});

var wrongElementSound = new Howl ({
  urls: ["sounds/errorsound.mp3"]
});

var gameOverSound = new Howl ({
  urls: ["sounds/endgamesound.mp3"]
});

var lifeSound = new Howl ({
  urls: ["sounds/lifesound.mp3"]
});

var bonusSound1 = new Howl ({
  urls: ["sounds/natesound1.mp3"]
});

var bonusSound2 = new Howl ({
  urls: ["sounds/natesound2.mp3"]
});

var bonusSound3 = new Howl ({
  urls: ["sounds/natesound3.mp3"]
});

/**
 * Music variables.
 */
var menuMusic = new Howl ({
  urls: ["sounds/mainmenusound.mp3"],
  loop: true,
  autoplay: true
});

var spellingMusic = new Howl ({
  urls: ["sounds/spacesound.mp3"]
});

var bonusMusic = new Howl ({
  urls: ["sounds/bonuslevelsound.mp3"]
});

$(document).ready(function () {
  /**
   * Plays menu button sound.
   */
  $(".button").click(function () {
    buttonSound.play();
  });

  $(".button-selected").click(function () {
    buttonSound.play();
  });

  $(".available").click(function () {
    buttonSound.play();
  });
  
  /**
   * Mutes or unmutes the sound.
   */
  $(".mute-button").click(function () {
    if (!muteSound) {
      Howler.mute();
      muteSound = true;
      $(".mute-button").html("Unmute Sound");
    } else {
      Howler.unmute();
      muteSound = false;
      $(".mute-button").html("Mute Sound");
    }
  });
});