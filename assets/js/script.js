// pointer variables for primary page element IDs
var welcomeEl = document.getElementById("welcome-wrapper");
var quizEl = document.getElementById("quiz-wrapper");
var doneEl = document.getElementById("all-done-wrapper");
var scoresEl = document.getElementById("high-scores-wrapper");


// pointer variables for button elements
var showScoresButton = document.getElementById("high-scores-button");
var homeButton = document.getElementById("home-button");
var startButton = document.getElementById("start-quiz-button");
var response1Button = document.getElementById("response1");
var response2Button = document.getElementById("response2");
var response3Button = document.getElementById("response3");
var response4Button = document.getElementById("response4");
var submitButton = document.getElementById("initials-submit-button");
var clearButton = document.getElementById("clear-high-scores");

// other pointer variables
var timerEl = document.getElementById("timer");
var minutesSpan = document.getElementById("minutes");
var secondsSpan = document.getElementById("seconds");
var questionEl = document.getElementById("question");
var response1El = document.getElementById("response1");
var response2El = document.getElementById("response2");
var response3El = document.getElementById("response3");
var response4El = document.getElementById("response4");
var myScoreSpan = document.getElementById("myScore");

// global constants
const quizDuration = 63; // quiz duration in seconds
const penalty = 10; // seconds removed from timer for each incorrect response
const secondsPerMinute = 60; // 60 seconds in a minute
const leadingZero = "0"; // used to pad timer seconds to ensure two digit seconds value
const ten = 10; // used to check if leading zero is required
const blank = " ________"; // used in responses
const numResponses = 4; // each quiz question is multiple choice with four possible answers
const one = "1. "; // prepended to response 1
const two = "2. "; // prepended to response 2
const three = "3. "; // prepended to response 3
const four = "4. "; // prepended to response 4

// global variables
var timeRemaining = 0;
var quizComplete = false;
var questionNumber = 0;
var questions = {
  1: {
    question: `Arrays in JavaScript can be used to store ${blank}.`,
    response1: "",
    response2: "",
    response3: "",
    response4: "",
    answer: 4,
  }
}
var highScores; // OBJECT VAR


function startTimer() {
  timeRemaining = quizDuration;
  updateTimer();

  var timerInterval = setInterval(function() {
    
    if (quizComplete === true) {
      clearInterval(timerInterval);
    }

    timeRemaining--;
    if (timeRemaining >=0 && quizComplete === false) {
      updateTimer();
    }

    if (timeRemaining <= 30) {
      // COLOR TIMER RED
    }

    if (timeRemaining <= 10) {
      // FLASHING RED BORDER AROUND QUESTION BOX
    }

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      doneMode();
    }

  }, 1000);

}


function minutesRemaining() {
  var minutes = Math.floor(timeRemaining / secondsPerMinute);
  return minutes;
}

function secondsRemaining() {
  var seconds = timeRemaining % secondsPerMinute; // % is the remainder operator
  // need seconds to always be two digits for the timer
  // add a leading zero if seconds < 10
  // if (toString(seconds).split("").length === 1) { // more complicated method without hardcoding a number
  if (seconds < ten) {
    seconds = leadingZero + seconds;
  }
  return seconds;
}

function updateTimer() {
  minutesSpan.textContent = minutesRemaining();
  secondsSpan.textContent = secondsRemaining();
}

// function from project word-guess with Steve Sills
function resolveKeyPress(event) {
  keyPress = event.key;
  validateKeyPress(keyPress);
}

// FUNCTION validateKeyPress
// gatekeeper for keypresses
// only valid key presses, i.e. '1', '2', '3', ... up to the number
// of multiple choice answers will be used to check the answer
function validateKeyPress(key) {
  var validSelection = false

 // check if the key press is a number
 if (isNaN(key) = false) {
    // check that the key press is a number within the range of valid responses
    for (var i = 0; i < numResponses; i++) {
      if (i+1 === key) {
        validSelection = true;
      }
    }
  }
  
  if (validSelection === true) {
    checkAnswer(key);
  }
}

function checkAnswer(key) {
  var responseIsCorrect = false;

  if (key === correctAnswer) {
    responseIsCorrect = true;
  }
  
  if (responseIsCorrect === true) {
    correctResponse();
  } else {
    incorrectResponse();
  }
  // color correct response green
  // pause for 1 second

  nextQuestion();
}

function incorrectResponse() {
  timeRemaining -= penalty;
  // color selected response button red,
}

function correctResponse() {

}

function nextQuestion() {
  questionNumber++;
  
  if (questionNumber > ten) {
    endQuiz(); // HOW MANY QUESTIONS? GET THIS FROM THE QUESTION OBJECT VAR
  }

  // DISPLAY QUESTION NUMBER questionNumber
  
}

// event listeners
showScoresButton.addEventListener("click", function() {
  scoresMode();
});

homeButton.addEventListener("click", function() {
  goHome();
});

startButton.addEventListener("click", function() {
  startQuiz();
});

response1Button.addEventListener("click", function() {
  endQuiz(); // TEMP FOR DEV
});

response2Button.addEventListener("click", function() {
  endQuiz(); // TEMP FOR DEV
});

response3Button.addEventListener("click", function() {
  endQuiz(); // TEMP FOR DEV
});

response4Button.addEventListener("click", function() {
  endQuiz(); // TEMP FOR DEV
});

submitButton.addEventListener("click", function() {
  submitInitials();
});

clearButton.addEventListener("click", function() {
  clearHighScores();
});

function goHome() {
  quizComplete = true;
  welcomeMode();
}

function startQuiz() {
  quizComplete = false;
  quizMode();
  startTimer();
  questionNumber = 0;
  nextQuestion();
}

function endQuiz() {
  quizComplete = true;
  myScoreSpan.textContent = timeRemaining; // score is equal to time remaining
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
  hideElement(homeButton);
  hideElement(timerEl);
}

function quizMode() {
  hideElement(welcomeEl);
  showElement(quizEl);
  hideElement(doneEl);
  hideElement(scoresEl);

  hideElement(showScoresButton);
  showElement(homeButton);
  showElement(timerEl);
}
// MAYBE HOME BUTTON INSTEAD OF SHOW SCORES BUTTON IN TOP LEFT ON THIS PAGE
function doneMode() {
  hideElement(welcomeEl);
  hideElement(quizEl);
  showElement(doneEl);
  hideElement(scoresEl);

  hideElement(showScoresButton);
  showElement(homeButton);
  showElement(timerEl);
}

function scoresMode() {
  hideElement(welcomeEl);
  hideElement(quizEl);
  hideElement(doneEl);
  showElement(scoresEl);

  hideElement(showScoresButton);
  showElement(homeButton);
  hideElement(timerEl);
}

// functions

function hideElement(element) {
  element.style.display = "none";
}

function showElement(element) {
  element.style.display = "block";
}