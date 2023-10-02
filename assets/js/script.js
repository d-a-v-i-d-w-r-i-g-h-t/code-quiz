// pointer variables for primary page element IDs
let welcomeEl = document.getElementById("welcome-wrapper");
let quizEl = document.getElementById("quiz-wrapper");
let doneEl = document.getElementById("all-done-wrapper");
let scoresEl = document.getElementById("high-scores-wrapper");


// pointer variables for button elements
let showScoresButton = document.getElementById("high-scores-button");
let homeButton = document.getElementById("home-button");
let startButton = document.getElementById("start-quiz-button");
let response1Button = document.getElementById("response1");
let response2Button = document.getElementById("response2");
let response3Button = document.getElementById("response3");
let response4Button = document.getElementById("response4");
let clearButton = document.getElementById("clear-high-scores");

// other pointer variables
let timerEl = document.getElementById("timer");
let minutesSpan = document.getElementById("minutes");
let secondsSpan = document.getElementById("seconds");
let questionEl = document.getElementById("question");
let response1El = document.getElementById("response1");
let response2El = document.getElementById("response2");
let response3El = document.getElementById("response3");
let response4El = document.getElementById("response4");
let finalScoreSpan = document.getElementById("finalScore");
let initialsInputForm = document.getElementById("form");
let initialsInput = document.getElementById("initials-input");
let resultMessageEl = document.getElementById("result-message");

// global constants
const quizDuration = 18; // quiz duration in seconds
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
const correct = "Correct!";
const wrong = "Wrong!";

const themeRed = "#de2626";
const themeGreen = "#1d881d";

// ADD DIVS FOR HIGH SCORES RATHER THAN ALWAYS SHOWING ALL OF THEM
// global variables
let timeRemaining = 0;
let quizComplete = false;
let questionNumber = 0;
let numberOfHighScores = {};
let newScore = 0;
let highScores; // will be loaded from localStorage or initialized if not found
let questions = {
  1: {
    question: `Arrays in JavaScript can be used to store ${blank}.`,
    response1: "numbers and strings",
    response2: "other arrays",
    response3: "booleans",
    response4: "all of the above",
    answer: 4
  },
  2: {
    question: `Question 2 ${blank}.`,
    response1: "numbers and strings",
    response2: "other arrays",
    response3: "booleans",
    response4: "all of the above",
    answer: 4
  },
  3: {
    question: `Question 3 ${blank}.`,
    response1: "numbers and strings",
    response2: "other arrays",
    response3: "booleans",
    response4: "all of the above",
    answer: 4
  }
};



function startTimer() {
  let redFrameOn = false;
  timeRemaining = quizDuration;
  updateTimer();

  let timerInterval = setInterval(function() {
    
    if (quizComplete === true) {
      clearInterval(timerInterval);
    }

    // prevents timer from updating after the quiz is complete
    timeRemaining--;
    if (timeRemaining >=0 && quizComplete === false) {
      updateTimer();
    }

    // change timer to red when there are 30 seconds left
    if (timeRemaining <= 30) {
      colorElement("#timer", themeRed);
    }

    // when the timeRemaining reaches 0, turn off both intervals
    // reset the quiz border, and proceed to done mode
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      clearInterval(flashInterval);
      resetQuizBorder();
      doneMode();
    }

  }, 1000,(0));

  // create a second interval to add a red flashing effect at 15 seconds remaining
  let flashInterval = setInterval(function() {
    if (timeRemaining <= 15) {

      if (redFrameOn === true) {
        resetQuizBorder();
      } else {
        colorQuizBorder(themeRed);
      }
      redFrameOn = !redFrameOn;
    }
  }, 500,(1));

}

function colorQuizBorder(color) {
  quizEl.style.borderColor = color;
  quizEl.style.boxShadow = "0 0 10px 2px " + color + ", inset 0 0 10px 2px " + color;
}

function resetQuizBorder() {
  quizEl.style.borderColor = "";
  quizEl.style.boxShadow = "";
  quizEl.style.transition = "border-color 0.5s, box-shadow 0.3s";
}


function minutesRemaining() {
  let minutes = Math.floor(timeRemaining / secondsPerMinute);
  return minutes;
}

function secondsRemaining() {
  let seconds = timeRemaining % secondsPerMinute; // % is the remainder operator
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
  console.log(keyPress);
  validateKeyPress(keyPress);
}

// gatekeeper for keypresses
// only valid key presses, i.e. '1', '2', '3', ... up to the number
// of multiple choice answers will be used to check the answer
function validateKeyPress(key) {
  let validSelection = false

  // check that the key press is a number within the range of valid responses
  for (let i = 0; i < numResponses; i++) {
    if (i+1 == key) {
      validSelection = true;
    }
  }
  
  if (validSelection === true) {
    checkAnswer(key);
  }
}

function checkAnswer(key) {
  let responseIsCorrect = false;
  let correctAnswer = questions[questionNumber].answer;
  if (key == correctAnswer) {
    responseIsCorrect = true;
  }
  
  if (responseIsCorrect === true) {
    correctResponse();
  } else {
    incorrectResponse(key);
  }
  colorElement("#response" + correctAnswer, themeGreen);


}

function incorrectResponse(key) {
  timeRemaining -= penalty;
  colorElement("#response" + key, themeRed);

  resultMessageEl.textContent = wrong;
  displayResultMessage();
}

function colorElement(element, color) {
  document.querySelector(element).style.backgroundColor = color;
  document.querySelector(element).style.boxShadow = "0 0 5px " + color;
}

function resetElementColor(element) {
  document.querySelectorAll(element).forEach(function(item) {
    item.style.backgroundColor = "";
    item.style.boxShadow = "";
  });
}

function correctResponse() {
  resultMessageEl.textContent = correct;
  displayResultMessage();
}

function displayResultMessage() {
  showElement(resultMessageEl);
  setTimeout(function(){
    hideElement(resultMessageEl);
    nextQuestion();
    resetElementColor(".button");
  }, 1000);
}

function nextQuestion() {
  questionNumber++;
  

  let numberOfQuestions = Object.keys(questions).length;

  if (questionNumber > numberOfQuestions) {
    endQuiz();
  } else {
    // update question and response text
    questionEl.textContent = questions[questionNumber].question;
    response1.textContent = one + questions[questionNumber].response1;
    response2.textContent = two + questions[questionNumber].response2;
    response3.textContent = three + questions[questionNumber].response3;
    response4.textContent = four + questions[questionNumber].response4;
  }
}

// event listeners
showScoresButton.addEventListener("click", function() {
  loadHighScores();
  scoresMode();
});

homeButton.addEventListener("click", function() {
  goHome();
});

startButton.addEventListener("click", function() {
  startQuiz();
});

response1Button.addEventListener("click", function() {
  checkAnswer(1);
});

response2Button.addEventListener("click", function() {
  checkAnswer(2);
});

response3Button.addEventListener("click", function() {
  checkAnswer(3);
});

response4Button.addEventListener("click", function() {
  checkAnswer(4);
});

initialsInputForm.addEventListener("submit", formSubmitted);

clearButton.addEventListener("click", function() {
  clearHighScores();
});


function formSubmitted(event) {
  event.preventDefault();

  // take first three characters of input string, make all caps
  let newInitials = initialsInput.value.slice(0,3).toUpperCase();

  //proceed if input is not blank
  if (newInitials != "") {
    submitInitials(newInitials);
    initialsInput.value = ""; // reset form
  }
}



function goHome() {
  quizComplete = true;
  welcomeMode();
}

function startQuiz() {
  quizComplete = false;
  quizMode();
  resetElementColor("#timer");
  startTimer();
  questionNumber = 0;
  nextQuestion();

  addQuizEventListeners();
}

function addQuizEventListeners() {
  document.addEventListener("keydown", resolveKeyPress);

}

function removeQuizEventListeners() {
  document.removeEventListener("keydown", resolveKeyPress);

}

function endQuiz() {
  removeQuizEventListeners());

  quizComplete = true;
  if (timeRemaining >=0) {
    newScore = timeRemaining; // new score is equal to time remaining
  } else {
    newScore = 0; // to prevent negative scores
  }
  finalScoreSpan.textContent = newScore; 
  doneMode();
}

function submitInitials(str) {
  loadHighScores();
  numberOfHighScores = Object.keys(highScores).length;
  let newScoreIsHighScore = false;
  let currentPosition = {initials: "", score: 0};
  let lowerPosition = {initials: "", score: 0};

  // starting for loop at 1 because this is referencing high score postions 1-10 rather than a zero-indexed array
  for (let i = 1; i <= numberOfHighScores; i++) {

    // check to see if the new score is higher than one of the current saved high scores
    if (newScore > highScores[i].score && newScoreIsHighScore === false) {
      newScoreIsHighScore = true;
      currentPosition.initials = str;
      currentPosition.score = newScore;
    }
    // if we're inserting a new score, we have to move the existing scores down
    if (newScoreIsHighScore === true) {

      // save the score at this position in lowerPosition
      lowerPosition.initials = highScores[i].initials;
      lowerPosition.score = highScores[i].score;

      // save the score being inserted into highScores
      highScores[i].initials = currentPosition.initials;
      highScores[i].score = currentPosition.score;

      // copy the score saved in lowerPosition into currentPosition
      // it will be put in the next position down on the next for-loop iteration
      // if we're already at the bottom of the list, it doesn't go anywhere
      currentPosition.initials = lowerPosition.initials;
      currentPosition.score = lowerPosition.score;
    }
  }
  saveHighScores();
  scoresMode();
}

function loadHighScores() {
  highScores = JSON.parse(localStorage.getItem("highScoresStringify"));

  // if high scores aren't saved in local storage, initialize the object variable
  if (!highScores) {
    initializeHighScores();
  }
  updateHighScores();
}

function updateHighScores() {
  numberOfHighScores = Object.keys(highScores).length;
  for (let i = 1; i <= numberOfHighScores; i++) {
    document.getElementById("initials" + i).textContent = highScores[i].initials;
    document.getElementById("score" + i).textContent = highScores[i].score;
  }
}


function saveHighScores() {
  updateHighScores();
  localStorage.setItem("highScoresStringify", JSON.stringify(highScores));
}

function clearHighScores() {
  initializeHighScores();
  saveHighScores();
}

// FOR TESTING
// function initializeHighScores() {
//   highScores = {
//     1: {initials: "DSW", score: 58},
//     2: {initials: "KCW", score: 56},
//     3: {initials: "GTW", score: 52},
//     4: {initials: "JAZ", score: 46},
//     5: {initials: "IMW", score: 41},
//     6: {initials: "MSW", score: 38},
//     7: {initials: "PWM", score: 31},
//     8: {initials: "GWM", score: 22},
//     9: {initials: "RJM", score: 13},
//     10: {initials: "PMW", score: 7}
//   };
// }
function initializeHighScores() {
  highScores = {
    1: {initials: "", score: ""},
    2: {initials: "", score: ""},
    3: {initials: "", score: ""},
    4: {initials: "", score: ""},
    5: {initials: "", score: ""},
    6: {initials: "", score: ""},
    7: {initials: "", score: ""},
    8: {initials: "", score: ""},
    9: {initials: "", score: ""},
    10: {initials: "", score: ""}
  };
}


// mode functions display:block one of the four primary wrapper-enclosed elements:
// welcome, quiz, all done, and high scores
// also shows/hides the SHOW SCORES button, the HOME button, and the TIMER, as appropriate
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

function hideElement(element) {
  element.style.display = "none";
}

function showElement(element) {
  element.style.display = "block";
}
