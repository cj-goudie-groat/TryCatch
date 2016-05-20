var wordList = []; // Array of words to find

var wordRow = document.getElementById("word-row"); // Div that displays the word
var currentWord; // Current word to find
var wordLength; // Length of the word to find
var letterCount = 0; // Current letter position to find

/**
 * Draw a random word at the top to collect.
 */
function drawWord() {
  var randomIndex = Math.floor(Math.random() * wordList.length);
  currentWord = wordList[randomIndex];
  wordLength = currentWord.length;
  for (var i = 0; i < wordLength; i++) {
    wordRow.insertCell(0);
  }
  for (var i = 0; i < wordLength; i++) {
    wordRow.cells[i].innerHTML = currentWord.charAt(i);
  }
}

/**
 * Clears cells in word row.
 */
function clearWord() {
  wordRow.innerHTML = "";
}

/**
 * Checks if the letter collected it the correct letter.
 */
function letterCollision(character) {
  if(character == currentWord.charAt(letterCount)) {
    if (letterCount != wordLength) {
      correctElementSound.play();
    }
    currentScore += 100 * scoreMult;
    document.getElementById("score-counter").innerHTML = "" + currentScore;
    wordRow.cells[letterCount].style = "color: #FFFFFF";
    letterCount++;
    
    // Checks if the word is complete and draws a new one if it is 
    if(letterCount == wordLength) {
      letterCount = 0;
      currentScore += 500 * scoreMult;
      correctWordSound.play();
      document.getElementById("score-counter").innerHTML = "" + currentScore;
      clearWord();
      drawWord();
    }
  } else {
    currentLives--;
    if (currentLives != 0) {
      wrongElementSound.play();
    }
    updateLives();
    // Determines if you lost the game or not
    if (currentLives == 0) {
      gameOver();
    }
  }
}

/**
 * Adds words from a text file then calls drawWord()
 * to randomly display one of the words.
 */
function addWords(data) {
  wordList = data;
  drawWord();
}

/**
 * Initializes by getting words from a txt file.
 */
$(document).ready(function () {
  $.get("js/spellingGame/wordList.txt", function (data) {
    addWords(data.toUpperCase().split("\n"));
  });
});