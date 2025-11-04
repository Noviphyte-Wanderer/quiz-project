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

// CHOICE POINTERS
const choices = [...document.getElementsByClassName('choice')];
const submitBtn = document.getElementById('submit');

const MAX_QUESTIONS = 8;

//Booleans
let acceptingAnswers = true;

// Set Questions
const fetchQuestions = async (link) => {
    try{
        const res = await fetch(link);
        const data = await res.json();
        return data;
    } catch (err){
        console.error("ERROR OCCURED!", err);
    }
}


/* Starts the game. */
function startQuiz() {
    questionCounter = 0;

    availableQuestions = [...questions];
    
    nextQuestion();
}

const setQuestionSet = async () => {
    const quizType = JSON.parse(localStorage.getItem("quizType"));
    
    switch (quizType){
        case "algebra":
            questions = await fetchQuestions("./algebraQuestions.json");
            break;
        case "vocabulary":
            questions = await fetchQuestions("./vocabQuestions.json");
            break;
        default:
            questions = [];
    }
  
    startQuiz();
}

setQuestionSet();


/* Leads to the next question. */
const nextQuestion = () => {
    questionCounter++;
    
    if (questionCounter > MAX_QUESTIONS || availableQuestions.length === 0){
        localStorage.setItem("percentage", JSON.stringify(100 * (numberCorrect / totalQuestions).toFixed(3)));
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
    console.log("CHECKING...");
    const answer = +choice.id.split("-")[1];
    const isCorrect = answer === currentQuestion.answer;
    const classToApply = (isCorrect) ? "correct" : "incorrect";
    
    choice.parentElement.classList.add(classToApply);
    result.classList.add(classToApply);
    result.innerText = (isCorrect) ? "CORRECT" : "INCORRECT";
    result.style.visibility = "visible";
    numberCorrect += isCorrect ? 1 : 0;
    setTimeout(() => {
        choice.parentElement.classList.remove(classToApply);
        result.innerText = "";
        result.style.visibility = "hidden";
        result.classList.remove(classToApply);
        nextQuestion();
    }, 1200);
    
}


submitBtn.addEventListener("click", () => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    checkAnswer(document.querySelector(".choice-container > input[type='radio']:checked"));
})


