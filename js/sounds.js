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

var achievementSound = new Howl ({
	urls: ["sounds/achievementsound.mp3"]
});

/**
 * Music variables
 */
var menuMusic = new Howl ({
  urls: ["sounds/mainmenusound.mp3"],
  loop: true,
});

var spellingMusic = new Howl ({
  urls: ["sounds/spacesound.mp3"]
});


var mathMusic = new Howl ({
  urls: ["sounds/junglebg.mp3"],
});

var bonusMusic = new Howl ({
  urls: ["sounds/bonuslevelsound.mp3"]
});


$(document).ready(function () {
  /**
   * Checks if the sound is muted when the page loads.
   */
  if (localStorage.getItem("Mute") == "muted") {
    Howler.mute();
    $(".mute").attr("src", "images/mute.png");
  } else {
    Howler.unmute();
    menuMusic.play();
    $(".mute").attr("src", "images/unmute.png");
  }
  
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
   * Mute or unmute the sound when mute icon is clicked.
   */
  $(".mute").click(function () {
    if (localStorage.getItem("Mute") != "muted") {
      localStorage.setItem("Mute", "muted");
      Howler.mute();
      menuMusic.stop();
      spellingMusic.stop();
      mathMusic.stop();
      bonusMusic.stop();
      $(".mute").attr("src", "images/mute.png");
    } else {
      localStorage.setItem("Mute", "unmuted");
      Howler.unmute();
      if (!gameActive) {
        menuMusic.play();
      } else if (bonusActive) {
        bonusMusic.loop(true);
        bonusMusic.play();
      } else if (gamemode == "spelling") {
        spellingMusic.loop(true);
        spellingMusic.play();
      } else if (gamemode == "math") {
        mathMusic.loop(true);
        mathMusic.play();
      }
      $(".mute").attr("src", "images/unmute.png");
    }
  });
});