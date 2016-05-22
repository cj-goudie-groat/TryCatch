var equationRow = document.getElementById("answer-row"); // Div that displays the equation
var currentNumber; // Current number to find
var operandCount = 0; // Current amount of operands found
var equationLength = 4; // Length of the full equation (1 + 1 [= 2])

var answer; // The answer to find
var operator; // Current operator in use
var operand1; // The first operand
var operand2; // The second operand

/**
 * Draw a random word at the top to collect.
 */
function drawEquation() {
  for (var i = 0; i < equationLength; i++) {
    equationRow.insertCell(0);
  }
  
  // Assign the operands and operator to their cell
  operand1 = equationRow.cells[0];
  operator = equationRow.cells[1];
  operand2 = equationRow.cells[2];
  
  // Generates a random number from -9 to 18
  answer = Math.floor(Math.random() * 28) - 9;
  equationRow.cells[3].innerHTML = " = " + answer;
}

/**
 * Collects the operand or operator and displays it at the top.
 * When the equation is complete, it calls checkAnswer() to check
 * if the equation is true or not.
 */
function equationCollision(character) {
  if (isNaN(character)) {
    correctElementSound.play();
    // Assign to operator if an operator is picked up
    operator.innerHTML = character;
  } else if (operand1.innerHTML == "") {
    correctElementSound.play();
    // Assign first operator if it is empty
    operand1.innerHTML = character;
  } else if (operator.innerHTML != "") {
    // Assign second operand if there is an operator
    operand2.innerHTML = character;
    
    // Checks if the answer is correct
    checkAnswer();
  }
}

/**
 * Checks what operator is in use and checks to see if the equation is correct.
 * If the answer is correct, it updates the score. If the answer is wrong, it
 * takes away a life. It then clears the equation and draws a new one.
 */
function checkAnswer() {
  if (operator.innerHTML == "+") { // Addition
    if (parseInt(operand1.innerHTML) + parseInt(operand2.innerHTML) == answer) {
      correctAnswerSound.play();
      currentScore += 500 * scoreMult;
    } else { // Wrong answer
      currentLives--;
      updateLives();

      if (currentLives != 0) {
        wrongElementSound.play();
      } else { // Lost the game
        gameOver();
      }
    }
  } else { // Subtraction
    if (parseInt(operand1.innerHTML) - parseInt(operand2.innerHTML) == answer) {
      correctAnswerSound.play();
      currentScore += 500 * scoreMult;
      clearEquation();
      drawEquation();
    } else { // Wrong answer
      currentLives--;
      updateLives();

      if (currentLives != 0) {
        wrongElementSound.play();
      } else { // Lost the game
        gameOver();
      }
    }
  }
  clearEquation();
  drawEquation();
}

/**
 * Clears cells in answer row.
 */
function clearEquation() {
  equationRow.innerHTML = "";
}

window.onload = drawEquation();