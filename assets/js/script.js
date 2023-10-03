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
const quizDuration = 180; // quiz duration in seconds
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

// **************************
// ADD DIVS FOR HIGH SCORES RATHER THAN ALWAYS SHOWING ALL OF THEM
// **************************

// global variables
let timeRemaining = 0;
let quizComplete = false;
let questionListNumber;
let randomizedQuestionList = [];
let numberOfHighScores = {};
let newScore = 0;
let highScores; // will be loaded from localStorage or initialized if not found



  //------------------------------//
 //  Object variable: questions  //
//------------------------------//

let questions = {
  1: {
    question: "What does HTML stand for?",
    response1: "Hyper Text Markup Language",
    response2: "Hyperlinks and Text Markup Language",
    response3: "Home Tool Markup Language",
    response4: "Hyper Transfer Markup Language",
    answer: 1
  },
  2: {
    question: "Which tag is used to create a hyperlink in HTML?",
    response1: "<a>",
    response2: "<link>",
    response3: "<href>",
    response4: "<hlink>",
    answer: 1
  },
  3: {
    question: "In CSS, what property is used to control the size of text?",
    response1: "font-size",
    response2: "text-size",
    response3: "letter-spacing",
    response4: "line-height",
    answer: 1
  },
  4: {
    question: "What is the purpose of JavaScript?",
    response1: "To style web pages",
    response2: "To add interactivity to web pages",
    response3: "To create database tables",
    response4: "To define web page structure",
    answer: 2
  },
  5: {
    question: "Which of the following is NOT a valid JavaScript variable name?",
    response1: "myVar",
    response2: "_myVar",
    response3: "123Var",
    response4: "$myVar",
    answer: 3
  },
  6: {
    question: "What is the correct way to comment in JavaScript?",
    response1: "// This is a comment",
    response2: "/* This is a comment */",
    response3: "# This is a comment",
    response4: "-- This is a comment",
    answer: 1
  },
  7: {
    question: "Which function is used to print something in the console in JavaScript?",
    response1: "console.print()",
    response2: "log.print()",
    response3: "print.console()",
    response4: "console.log()",
    answer: 4
  },
  8: {
    question: "How do you define a function in JavaScript?",
    response1: "function myFunction() {}",
    response2: "def myFunction() {}",
    response3: "method myFunction() {}",
    response4: "func myFunction() {}",
    answer: 1
  },
  9: {
    question: "Which CSS property is used to change the text color of an element?",
    response1: "text-color",
    response2: "color",
    response3: "font-color",
    response4: "background-color",
    answer: 2
  },
  10: {
    question: "In HTML, which tag is used to create an unordered list?",
    response1: "<ul>",
    response2: "<li>",
    response3: "<ol>",
    response4: "<dl>",
    answer: 1
  },
  11: {
    question: "What is the purpose of the 'defer' attribute in a script tag?",
    response1: "It loads the script asynchronously",
    response2: "It delays the execution of the script until the page has finished parsing",
    response3: "It sets the script to execute after a specified time interval",
    response4: "It loads the script in the background without blocking the page rendering",
    answer: 2
  },
  12: {
    question: "How can you include an external JavaScript file in an HTML document?",
    response1: "<script href='script.js'></script>",
    response2: "<script src='script.js'></script>",
    response3: "<javascript src='script.js'></javascript>",
    response4: "<link rel='javascript' href='script.js'>",
    answer: 2
  },
  13: {
    question: "Which CSS selector is used to select elements with a specific class?",
    response1: "#",
    response2: ".",
    response3: "$",
    response4: "@",
    answer: 2
  },
  14: {
    question: "What is the purpose of the 'box-sizing' property in CSS?",
    response1: "To set the border size of an element",
    response2: "To control the spacing between elements",
    response3: "To include padding and border in the element's total width and height",
    response4: "To set the margin size of an element",
    answer: 3
  },
  15: {
    question: "Which HTML tag is used to define an image?",
    response1: "<img>",
    response2: "<image>",
    response3: "<picture>",
    response4: "<figure>",
    answer: 1
  },
  16: {
    question: "What is the purpose of the 'this' keyword in JavaScript?",
    response1: "To refer to the current object",
    response2: "To create a new variable",
    response3: "To specify a CSS selector",
    response4: "To declare a function",
    answer: 1
  },
  17: {
    question: "Which of the following is a valid way to declare a JavaScript array?",
    response1: "let colors = [\"red\", \"green\", \"blue\"]",
    response2: "let colors = {\"red\", \"green\", \"blue\"}",
    response3: "let colors = \"red, green, blue\"",
    response4: "let colors = (\"red\", \"green\", \"blue\")",
    answer: 1
  },
  18: {
    question: "In CSS, what property is used to control the layout of an element's children?",
    response1: "display",
    response2: "position",
    response3: "float",
    response4: "margin",
    answer: 1
  },
  19: {
    question: "What is the purpose of the 'localStorage' object in JavaScript?",
    response1: "To store data permanently on the server",
    response2: "To store data temporarily on the client's browser",
    response3: "To store data in cookies",
    response4: "To store data in a database",
    answer: 2
  },
  20: {
    question: "Which event is triggered when a user clicks on an HTML element?",
    response1: "onhover",
    response2: "onchange",
    response3: "onclick",
    response4: "onsubmit",
    answer: 3
  },
  21: {
    question: "What does the 'z-index' property in CSS control?",
    response1: "Text alignment",
    response2: "Element rotation",
    response3: "Element stacking order",
    response4: "Font size",
    answer: 3
  },  22: {
    question: "Which method is used to add a new item to the end of an array in JavaScript?",
    response1: "push()",
    response2: "append()",
    response3: "addToEnd()",
    response4: "insertEnd()",
    answer: 1
  },
  23: {
    question: "What is the purpose of the 'transition' property in CSS?",
    response1: "To create a smooth transition between different CSS styles",
    response2: "To transition between different HTML pages",
    response3: "To control the transition between JavaScript functions",
    response4: "To apply a transition effect to images",
    answer: 1
  },
  24: {
    question: "How can you select an HTML element with the id 'myElement' using JavaScript?",
    response1: "getElementByName('myElement')",
    response2: "select('myElement')",
    response3: "document.getElement('myElement')",
    response4: "document.getElementById('myElement')",
    answer: 4
  },
  25: {
    question: "In CSS, what property is used to control the spacing between lines of text?",
    response1: "line-height",
    response2: "text-spacing",
    response3: "font-spacing",
    response4: "line-spacing",
    answer: 1
  },
  26: {
    question: "What is the purpose of the 'target' attribute in an HTML anchor tag (<a>)?",
    response1: "To specify the link's target page",
    response2: "To set the font size of the link",
    response3: "To target a specific CSS class",
    response4: "To define the link's color",
    answer: 1
  },
  27: {
    question: "How do you comment out multiple lines in JavaScript?",
    response1: "// This is a comment",
    response2: "/* This is a comment */",
    response3: "-- This is a comment",
    response4: "# This is a comment",
    answer: 2
  },
  28: {
    question: "What does the 'document' object represent in the DOM (Document Object Model)?",
    response1: "The HTML document itself",
    response2: "A specific HTML element",
    response3: "The CSS stylesheet",
    response4: "The JavaScript code",
    answer: 1
  },
  29: {
    question: "Which attribute is used to include external CSS styles in an HTML document?",
    response1: "style",
    response2: "link",
    response3: "css",
    response4: "href",
    answer: 2
  },
  30: {
    question: "What is the purpose of the 'splice' method in JavaScript arrays?",
    response1: "To remove the last element of the array",
    response2: "To add elements to the beginning of the array",
    response3: "To remove or replace elements at a specific index",
    response4: "To reverse the order of the elements",
    answer: 3
  },
  31: {
    question: "What is the purpose of the 'box-shadow' property in CSS?",
    response1: "To add a shadow to an HTML element",
    response2: "To create a shadow for text elements",
    response3: "To control the shadow of an image",
    response4: "To add a shadow to the entire page",
    answer: 1
  },
  32: {
    question: "Which event is triggered when an HTML form is submitted?",
    response1: "onsubmit",
    response2: "onclick",
    response3: "onchange",
    response4: "onsubmitform",
    answer: 1
  },
  33: {
    question: "In JavaScript, what does the 'isNaN()' function do?",
    response1: "Checks if a value is not a string",
    response2: "Checks if a value is not a number",
    response3: "Checks if a value is null",
    response4: "Checks if a value is undefined",
    answer: 2
  },
  34: {
    question: "Which of the following is NOT a valid CSS display property value?",
    response1: "block",
    response2: "inline",
    response3: "stack",
    response4: "flex",
    answer: 3
  },
  35: {
    question: "What does the 'JSON' acronym stand for?",
    response1: "JavaScript Object Notation",
    response2: "Java Syntax Object Notation",
    response3: "JavaScript Oriented Network",
    response4: "Java Object Naming",
    answer: 1
  },
  36: {
    question: "How can you prevent the default behavior of an HTML element's event in JavaScript?",
    response1: "event.prevent()",
    response2: "event.stop()",
    response3: "event.cancel()",
    response4: "event.preventDefault()",
    answer: 4
  },
  37: {
    question: "Which CSS property is used to create rounded corners?",
    response1: "corner-radius",
    response2: "border-round",
    response3: "border-radius",
    response4: "corner-round",
    answer: 3
  },
  38: {
    question: "What is the purpose of the 'localStorage' object in JavaScript?",
    response1: "To store data permanently on the server",
    response2: "To store data temporarily on the client's browser",
    response3: "To store data in cookies",
    response4: "To store data in a database",
    answer: 2
  },
  39: {
    question: "How do you add a comment in HTML?",
    response1: "<!-- This is a comment -->",
    response2: "// This is a comment",
    response3: "' This is a comment",
    response4: "# This is a comment",
    answer: 1
  },
  40: {
    question: "Which method is used to remove the last item from an array in JavaScript?",
    response1: "remove()",
    response2: "pop()",
    response3: "delete()",
    response4: "shift()",
    answer: 2
  },
  41: {
    question: "What does CSS stand for?",
    response1: "Counter Style Sheets",
    response2: "Colorful Style Sheets",
    response3: "Computer Style Sheets",
    response4: "Cascading Style Sheets",
    answer: 4
  },
  42: {
    question: "In JavaScript, what is the purpose of the 'setTimeout()' function?",
    response1: "To set a timer for a function to execute after a specified delay",
    response2: "To stop the execution of a function",
    response3: "To delay the loading of a script",
    response4: "To synchronize animations",
    answer: 1
  },
  43: {
    question: "Which HTML tag is used to define a table row?",
    response1: "<tr>",
    response2: "<td>",
    response3: "<table-row>",
    response4: "<row>",
    answer: 1
  },
  44: {
    question: "What is the purpose of the 'flexbox' layout in CSS?",
    response1: "To create flexible box-like structures",
    response2: "To style text elements",
    response3: "To control image sizes",
    response4: "To apply borders to elements",
    answer: 1
  },
  45: {
    question: "How do you apply an external CSS file to only print media?",
    response1: "<link rel='stylesheet' href='styles.css' media='print'>",
    response2: "<link rel='print' href='styles.css'>",
    response3: "<style media='print'>",
    response4: "<style type='print' src='styles.css'>",
    answer: 1
  },
  46: {
    question: "What is the purpose of the 'typeof' operator in JavaScript?",
    response1: "To check if a variable is defined",
    response2: "To determine the type of a variable",
    response3: "To convert a variable to a different type",
    response4: "To declare a new variable",
    answer: 2
  },
  47: {
    question: "Which HTML tag is used to create a clickable button?",
    response1: "<button>",
    response2: "<clickable>",
    response3: "<input type='button'>",
    response4: "<btn>",
    answer: 1
  },
  48: {
    question: "What is the purpose of the 'keydown' event in JavaScript?",
    response1: "To trigger when a key is pressed down",
    response2: "To trigger when a key is released",
    response3: "To trigger when a mouse button is clicked",
    response4: "To trigger when an element is focused",
    answer: 1
  },
  49: {
    question: "In CSS, what is the 'box model' used for?",
    response1: "To create rounded corners",
    response2: "To control the layout and spacing of elements",
    response3: "To apply shadows to elements",
    response4: "To define the order of stacked elements",
    answer: 2
  },
  50: {
    question: "Which method is used to join two or more arrays in JavaScript?",
    response1: "concat()",
    response2: "join()",
    response3: "merge()",
    response4: "combine()",
    answer: 1
  }
};


  //------------------------------//
 //  "always-on" event listeners //
//------------------------------//

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

initialsInputForm.addEventListener("submit", formSubmitted);

clearButton.addEventListener("click", function() {
  clearHighScores();
});



  //-----------------------------//
 //  Function: startQuiz        //
//-----------------------------//

function startQuiz() {
  quizComplete = false;
  quizMode();
  resetElementColor("#timer");
  startTimer();
  questionListNumber = 0;
  // getRandomizedQuestionList()
  nextQuestion();

  addQuizEventListeners();
}

  //-----------------------------------//
 //  Function: addQuizEventListeners  //
//-----------------------------------//

function addQuizEventListeners() {
  document.addEventListener("keydown", resolveKeyPress);

  quizEl.addEventListener("click", function(event) {
    var element = event.target;

    // console.log("I was clicked");
    // console.log("element: ", element)
    // console.log('element.matches("h2"): ', element.matches("h2"));
    // console.log('element.matches(".response"): ', element.matches(".response"));

    if (element.matches(".response")) {
      // console.log(element.getAttribute("data-index"));
      checkAnswer(element.getAttribute("data-index"));
    }
  });
}

  //--------------------------------------//
 //  Function: removeQuizEventListeners  //
//--------------------------------------//

function removeQuizEventListeners() {
  document.removeEventListener("keydown", resolveKeyPress);

  quizEl.addEventListener("click", function(event) {
    var element = event.target;

    if (element.matches(".response")) {
      checkAnswer(element.getAttribute("data-index"));
    }
  });
}

function handleResponseClick() {
  
}


  //-----------------------------//
 //  Function: startTimer       //
//-----------------------------//

function startTimer() {
  let redFrameOn = false;
  timeRemaining = quizDuration;
  updateTimer();

  let timerInterval = setInterval(function() {
    
    if (quizComplete === true) {
      clearInterval(timerInterval);
    }

    timeRemaining--;

    // prevents timer from updating after the quiz is complete
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



  //-----------------------------//
 //  Function: nextQuestion     //
//-----------------------------//

function nextQuestion() {
  questionListNumber++;

  console.log("question number: " + questionListNumber);

  let numberOfQuestions = Object.keys(questions).length;

  console.log("numberOfQuestions: "+ numberOfQuestions);
  console.log("time remaining: " + timeRemaining);

  if (questionListNumber >= numberOfQuestions) {
    endQuiz();
  } else {
    // update question and response text
    // let index = randomizedQuestionList[questionListNumber];
    let index = questionListNumber;

    // console.log(randomizedQuestionList);
    // console.log(questionListNumber);
    // console.log(index);

    questionEl.textContent = questions[index].question;
    response1.textContent = one + questions[index].response1;
    response2.textContent = two + questions[index].response2;
    response3.textContent = three + questions[index].response3;
    response4.textContent = four + questions[index].response4;
  }
}



  //-----------------------------//
 //  Function: checkAnswer      //
//-----------------------------//

function checkAnswer(key) {
  let responseIsCorrect = false;
  // let index = randomizedQuestionList[questionListNumber]
  let index = questionListNumber;
  let correctAnswer = questions[index].answer;
  if (key == correctAnswer) {
    responseIsCorrect = true;
  }

  colorElement("#response" + correctAnswer, themeGreen);

  if (responseIsCorrect === true) {
    resultMessageEl.textContent = correct;
  } else {
    resultMessageEl.textContent = wrong;

    colorElement("#response" + key, themeRed);

    timeRemaining -= penalty;
    }

  displayResultMessage();
}



  //----------------------------------//
 //  Function: displayResultMessage  //
//----------------------------------//

function displayResultMessage() {
  // display the result message (Correct! / Wrong!) and
  // turn off event listeners
  showElement(resultMessageEl);
  removeQuizEventListeners();

  // wait a specified time before user can proceed to the next question
  // turn event listeners back on
  setTimeout(function(){
    hideElement(resultMessageEl);
    nextQuestion();
    resetElementColor(".button");
    addQuizEventListeners();
  }, 500);

}



  //--------------------------------------//
 //  Function: getRandomizedQuestionList  //
//--------------------------------------//

// function getRandomizedQuestionList() {
//   let numberOfQuestions = Object.keys(questions).length;
//   let list = [];

//   // create ordered list
//   for (let i = 0; i < numberOfQuestions; i++) {
//     list[i] = i+1; // array is zero-based while question list is 1-based
//   }
//   console.log(list);
//   randomizedQuestionList = [];
//   for (i = 0; i < list.length; i++) {
//     randomItem = getRandomItem(list);
//     randomizedQuestionList.push(randomItem);
//     // remove the "used" item from the input list so each question number is only used once
//     list = list.splice(list.indexOf(randomItem),1);
//   }
//   console.log(randomizedQuestionList);
// }

// function getRandomItem(inputArray) {
//   var randomIndex = Math.floor(Math.random() * inputArray.length);
//   var randomListItem = inputArray[randomIndex];
//   return randomListItem;
// }


function colorQuizBorder(color) {
  quizEl.style.borderColor = color;
  quizEl.style.boxShadow = "0 0 10px 2px " + color + ", inset 0 0 10px 2px " + color;
}

function resetQuizBorder() {
  quizEl.style.borderColor = "";
  quizEl.style.boxShadow = "";
  quizEl.style.transition = "border-color 0.5s, box-shadow 0.3s";
}



  //-----------------------------//
 //  Function: updateTimer      //
//-----------------------------//

function updateTimer() {
// convert timeRemaining to m:ss format for display
  minutesSpan.textContent = minutesRemaining();
  secondsSpan.textContent = secondsRemaining();
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



  //-----------------------------//
 //  Function: resolveKeyPress  //
//-----------------------------//

// function from project word-guess with Steve Sills
function resolveKeyPress(event) {
  keyPress = event.key;
  // console.log(keyPress);

  let validSelection = false

  // check that the key press is a number within the range of valid responses
  for (let i = 0; i < numResponses; i++) {
    if (i+1 == keyPress) {
      validSelection = true;
    }
  }
  
  if (validSelection === true) {
    checkAnswer(keyPress);
  }
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

function endQuiz() {
  removeQuizEventListeners();

  quizComplete = true;
  if (timeRemaining >=0) {
    newScore = timeRemaining; // new score is equal to time remaining
  } else {
    newScore = 0; // to prevent negative scores
  }
  finalScoreSpan.textContent = newScore; 
  doneMode();
}

  //----------------------------//
 //  Function: submitInitials  //
//----------------------------//

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


  //------------------------------------------------------//
 //  Functions: load, save, update, and clearHighScores  //
//------------------------------------------------------//

function loadHighScores() {
  highScores = JSON.parse(localStorage.getItem("highScoresStringify"));

  // if high scores aren't saved in local storage, initialize the object variable
  if (!highScores) {
    initializeHighScores();
  }
  updateHighScores();
}
function saveHighScores() {
  updateHighScores();
  localStorage.setItem("highScoresStringify", JSON.stringify(highScores));
}
function updateHighScores() {
  numberOfHighScores = Object.keys(highScores).length;
  for (let i = 1; i <= numberOfHighScores; i++) {
    document.getElementById("initials" + i).textContent = highScores[i].initials;
    document.getElementById("score" + i).textContent = highScores[i].score;
  }
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



  //------------------//
 //  Mode Functions  //
//------------------//

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
