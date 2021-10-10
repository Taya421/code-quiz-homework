
 // set of questions defined
 const questions = [
    {
        question: "What was the name of the hospital in the beginning?",
        choices: ["a. Seattle Hospital", "b. Seattle Grace Mercy West Hospital", "c. Mercy West", "d. Seattle Grace Hospital"],
        answer: "d. Seattle Grace Hospital"
    },
    {
        question: "What disease did Meredith Grey's mother have?",
        choices: ["a. diabeties", "b. parkinsons", "c. alzheimer's", "d. dementia"],
        answer: "c. alzheimer's"
    },
    {
        question: "The show Grey's Anatomy starting airing in which year?",
        choices: ["a. 2001", "b. 2005", "c. 2008", "d. 2010"],
        answer: "b. 2005"
    },
    {
        question: "In which season did the ferry boat incident happen?",
        choices: ["a. season 2", "b. season 4", "c. season 3", "d. season 5"],
        answer: "c. season 3"
    },
    {
        question: "Where did Cristina move to?",
        choices: ["a. germany", "b. switzerland", "c. italy", "d. england"],
        answer: "b. switzerland"
    },
    {
        question: "When do Derek and Meredith offically get married?",
        choices: ["a. season 3", "b. season 5", "c. season 8", "d. season 10"],
        answer: "c. season 8"
    },
    {
        question: "What type of alcohol was yang's and mer's favorite?",
        choices: ["a. vodka", "b. tequila", "c. rum", "d. whisky"],
        answer: "b. tequila"
    },
    {
        question: "Andrew Deluca is diagnosed with what?",
        choices: ["a. bipolar disorder", "b. anxiety", "c. depression", "d. ocd"],
        answer: "a. bipolar disorder"
    },
    {
        question: "Who does Cristina stab with a epi?",
        choices: ["a. Meredith", "b. Izzie", "c. Alex", "d. Bailey"],
        answer: "c. Alex"
    },
    {
        question: "Who gave Derek the name McDreamy?",
        choices: ["a. Meredith", "b. Mark", "c. Cristina", "d. Alex"],
        answer: "c. Cristina"
    },
    {
        question: "Who won the sparkle pager?",
        choices: ["a. Meredith", "b. Cristina", "c. Alex", "d.  George"],
        answer: "a. Meredith"
    },
    {
        question: "Who failed their medical boards?",
        choices: ["a. April", "b. George", "c. Alex", "d. Jackson"],
        answer: "a. April"
    }
];


var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");

var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");
var everything = document.getElementById("everything");

var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

// define the other variables
var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

/**
 * FUNCTIONS
 */

// WHEN I click the start button, the timer starts
var totalTime = 151;
function newQuiz() {
    questionIndex = 0;
    totalTime = 150;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);

    showQuiz();
};


// then presented with questions and choices
function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}


// after question is answered, show if correct or wrong
function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        // correct answer, add 1 score to final score
        correctAns++;
        // console.log(correctAns);
        answerCheck.textContent = "Correct!";
    } else {
        // wrong answer, deduct 10 second from timer
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++;
    // repeat with the rest of questions 
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        // if there are no more question, run game over function
        gameOver();
    }
}


function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }

function chooseC() { checkAnswer(2); }

function chooseD() { checkAnswer(3); }


// when all questions are answered or timer reaches 0, the game is over
function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

    // show final score
    finalScore.textContent = correctAns;
}


// enter initial and store the highscore in local storage
function storeHighScores(event) {
    event.preventDefault();

    // stop function if the initial is blank
    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   

    // store the scores into local storage
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    // stringify array in order to store in local
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    // this will show current highscores
    showHighScores();
}

// this function is to show high scores
var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    // check if there is any in local storage
    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}


startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});
