var answerRow = document.getElementById("answer-row"); // Div that displays the word
var letterCount = 0; // Current letter position to find

/**
 * Draw a random word at the top to collect.
 */
function drawWord() {
  var randomIndex = Math.floor(Math.random() * wordList.length);
  currentWord = wordList[randomIndex];
  wordLength = currentWord.length;
  for (var i = 0; i < wordLength; i++) {
    answerRow.insertCell(0);
  }
  for (var i = 0; i < wordLength; i++) {
    answerRow.cells[i].innerHTML = currentWord.charAt(i);
  }
}

/**
 * Clears cells in word row.
 */
function clearWord() {
  answerRow.innerHTML = "";
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
    answerRow.cells[letterCount].style = "color: #FFFFFF";
    letterCount++;
    
    // Checks if the word is complete and draws a new one if it is 
    if(letterCount == wordLength) {
      letterCount = 0;
      currentScore += 500 * scoreMult;
      correctAnswerSound.play();
      document.getElementById("score-counter").innerHTML = "" + currentScore;
      clearWord();
      drawWord();
    }
  } else {
    loseLife();
    updateLives();
  }
}

window.onload = drawWord();