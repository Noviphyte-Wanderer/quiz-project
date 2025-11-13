let currentQuestion = {};
let questionCounter = 0;
let availableQuestions = [];
let totalQuestions = 0;
let numberCorrect = 0;


let questions = [];
// TEXT POINTERS
const questionText = document.getElementById("question");
const questionNumber = document.getElementById("question-number");
const result = document.getElementById('result');
const extraComments = document.getElementById('extra-commentary');

// CHOICE POINTERS
const choices = [...document.getElementsByClassName('choice')];
const submitBtn = document.getElementById('submit');
const continueBtn = document.getElementById('continue')

let MAX_QUESTIONS;

//Booleans
let acceptingAnswers = true;

//Global data.
let classToApply = "";

// Set Questions
const fetchQuestions = async (link) => {
    try{
        const res = await fetch(link);
        const data = await res.json();
        console.log("L:", data.length);
        return data;
    } catch (err){
        console.error("ERROR OCCURED!", err);
    }
}

/* Starts the game. */
function startQuiz() {
    questionCounter = 0;

    availableQuestions = [...questions];
    MAX_QUESTIONS = localStorage.getItem("MAX_QUESTIONS") || availableQuestions.length;
    console.log("MAX:", MAX_QUESTIONS);
    nextQuestion();
}

const setQuestionSet = async () => {
    const quizType = JSON.parse(localStorage.getItem("quizType"));
    
    switch (quizType){
        case "algebra":
            questions = await fetchQuestions("../json/algebraQuestions.json");
            break;
        case "vocabulary":
            questions = await fetchQuestions("../json/vocabQuestions.json");
            break;
        case "history":
            questions = await fetchQuestions("../json/historyQuestions.json");
            break;
        case "chemistry":
            questions = await fetchQuestions("../json/chemistryQuestions.json");
            break;
        default:
            questions = [];
    }
    
    startQuiz();
}

setQuestionSet();


/* Leads to the next question. */
const nextQuestion = () => {
    choices.forEach(choice => {
        choice.checked = false;
    });
    questionCounter++;
    
    if (questionCounter > MAX_QUESTIONS || availableQuestions.length === 0){
        localStorage.setItem("percentage", JSON.stringify(100 * (numberCorrect / totalQuestions).toFixed(4)));
        window.location.assign("./results.html");
    } else {
    
        totalQuestions++;

        //Render Question
        const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];

        questionNumber.innerText = `Q${questionCounter}`;
        questionText.innerText = currentQuestion.question;
        choices.forEach((choice, index) => {
            choice.innerText = currentQuestion[`choice${index + 1}`];
        });

        availableQuestions.splice(questionIndex, 1);

        acceptingAnswers = true;
    }
    
}

/* Checks your answer */
const checkAnswer = (choice) => {

    const answer = +choice.id.split("-")[1];
    const isCorrect = answer === currentQuestion.answer;
    classToApply = (isCorrect) ? "correct" : "incorrect";

    choice.parentElement.classList.add(classToApply);
    result.classList.add(classToApply);
    result.innerText = (isCorrect) ? "CORRECT" : "INCORRECT";
    result.classList.remove("hidden");
    const extraComment = currentQuestion.hasOwnProperty("extra-commentary");
    extraComments.innerText = (extraComment) ? currentQuestion["extra-commentary"] : "";
    if (extraComment){
        extraComments.classList.remove('hidden');
    }
    numberCorrect += isCorrect ? 1 : 0;
    
    continueBtn.classList.remove("hidden");
    submitBtn.classList.add('hidden');


}


submitBtn.addEventListener("click", () => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    checkAnswer(document.querySelector(".choice-container > input[type='radio']:checked"));
})

continueBtn.addEventListener("click", () => {
    submitBtn.classList.remove('hidden');
    continueBtn.classList.add("hidden");

 
    const choice = document.querySelector(".choice-container > input[type='radio']:checked");
   
    choice.parentElement.classList.remove(classToApply);
    choice.checked = false;
    result.innerText = "";
    result.classList.remove(classToApply);
    extraComments.innerText = "";
    result.classList.add('hidden');
    nextQuestion();
})


