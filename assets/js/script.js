// pointer variables for primary page element IDs
var welcomeEl = document.getElementById("welcome-wrapper");
var quizEl = document.getElementById("quiz-wrapper");
var doneEl = document.getElementById("all-done-wrapper");
var scoresEl = document.getElementById("high-scores-wrapper");


// pointer variables for button elements
var showScoresButton = document.getElementById("high-scores-button");
var startButton = document.getElementById("start-quiz-button");
var response1Button = document.getElementById("response1");
var response2Button = document.getElementById("response2");
var response3Button = document.getElementById("response3");
var response4Button = document.getElementById("response4");
var submitButton = document.getElementById("initials-submit-button");
var backButton = document.getElementById("go-back");
var clearButton = document.getElementById("clear-high-scores");

// other pointer variables
var timerEl = document.getElementById("timer");

// global constants



// global variables



// event listeners
showScoresButton.addEventListener("click", function() {
  scoresMode();
});

startButton.addEventListener("click", function() {
  startQuiz();
});

response1Button.addEventListener("click", function() {
  endQuiz();
});

response2Button.addEventListener("click", function() {
  endQuiz();
});

response3Button.addEventListener("click", function() {
  endQuiz();
});

response4Button.addEventListener("click", function() {
  endQuiz();
});

submitButton.addEventListener("click", function() {
  submitInitials();
});

backButton.addEventListener("click", function() {
  goBackHome();
});

clearButton.addEventListener("click", function() {
  clearHighScores();
});

function goBackHome() {
  welcomeMode();
}

function startQuiz() {
  quizMode();
}

function endQuiz() {
  doneMode();
}

function submitInitials() {
  // retrieve score object variable from localStorage
  // (maybe do this page loads?)
  // add score to score object variable
  // save score object variable to localStorage
  // display high score table
  scoresMode();
}

function clearHighScores() {

}

// mode functions
function welcomeMode() {
  showElement(welcomeEl);
  hideElement(quizEl);
  hideElement(doneEl);
  hideElement(scoresEl);

  showElement(showScoresButton);
  hideElement(timerEl);
}
// TIMER NEEDS TO BE ALWAYS TOP RIGHT ALIGNED
// MAYBE SCORES BUTTON CAN BE VISIBILITY:HIDDEN INSTEAD OF DISPLAY: NONE
function quizMode() {
  hideElement(welcomeEl);
  showElement(quizEl);
  hideElement(doneEl);
  hideElement(scoresEl);

  hideElement(showScoresButton);
  showElement(timerEl);
}
// MAYBE HOME BUTTON INSTEAD OF SHOW SCORES BUTTON IN TOP LEFT ON THIS PAGE
function doneMode() {
  hideElement(welcomeEl);
  hideElement(quizEl);
  showElement(doneEl);
  hideElement(scoresEl);

  showElement(showScoresButton);
  showElement(timerEl);
}

function scoresMode() {
  hideElement(welcomeEl);
  hideElement(quizEl);
  hideElement(doneEl);
  showElement(scoresEl);

  // *** COULD HAVE BACK BUTTON IN THE PLACE OF   *** //
  // *** TOP LEFT SHOW SCORES BUTTON IN THIS MODE *** //
  hideElement(showScoresButton);
  hideElement(timerEl);
}

// functions

function hideElement(element) {
  element.style.display = "none";
}

function showElement(element) {
  element.style.display = "block";
}