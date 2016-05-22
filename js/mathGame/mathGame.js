var answerRow = document.getElementById("answer-row"); // Div that displays the equation
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
function drawNumber() {
  for (var i = 0; i < equationLength; i++) {
    answerRow.insertCell(0);
  }
  
  // Assign the operands and operator to their cell
  operand1 = answerRow.cells[0];
  operator = answerRow.cells[1];
  operand2 = answerRow.cells[2];
  
  // Generates a random number from -9 to 18
  answer = Math.floor(Math.random() * 28) - 9;
  answerRow.cells[3].innerHTML = " = " + answer;
}

function equationCollision(character) {
  if (!isNaN(character)) {
    // Assign to operator if an operator is picked up
    operator.innerHTML = character;
  } else {
    if (operand1.innerHTML == "") {
      // Fill left operand if empty
      operand1.innerHTML == "";
    } else if (operand2.innerHTML == "") {
      // Fill right operand if left is full and right is empty
      operand2.innerHTML == "";
    } else {
      if (parseInt(operand1.innerHTML) + parseInt(operand2.innerHTML) == answer) {
        // Correct answer
        correctAnswerSound.play();
        currentScore += 500 * scoreMult;
      } else { // Wrong answer
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
  }
}

/**
 * Clears cells in word row.
 */
function clearAnswer() {
  answerRow.innerHTML = "";
}

window.onload = drawNumber();