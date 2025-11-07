const quizTitle = document.getElementById('quiz-title');

const topicLinks = [...document.getElementsByClassName("topic-link")];
const numQuestions = document.getElementById("num-questions");
const maxQuestions = document.getElementById("max-questions");
const settingBtn = document.getElementById("settings-btn");
const settingsContainer = document.getElementById('settings-container');
const applyBtn = document.getElementById('apply');

const questionSetTable = {
    "algebra": "../json/algebraQuestions.json",
    "vocabulary": "../json/vocabQuestions.json",
    "history": "../json/historyQuestions.json"
}

const setNumQuestions = async (type) => {
    console.log("CHECK");
    const res = await fetch(questionSetTable[type]);
    const data = await res.json();
    numQuestions.setAttribute("max", data.length);
    maxQuestions.innerText = "Maximum: " + data.length;
}

let quizType = JSON.parse(localStorage.getItem('quizType'));
setNumQuestions(quizType);
const setTitle = () => {
    quizTitle.innerText = `${quizType[0].toUpperCase() + quizType.slice(1)} Quiz`;
}
setTitle();
topicLinks.forEach(topic => {
    const topicRegex = /[a-zA-z]+(?=\-link)/g;
    topic.addEventListener("click", (e) => {
        quizType = e.target.id.match(topicRegex)[0];
        setTitle();
        setQuizType();
        setNumQuestions(quizType);
    })
});

const setQuizType = () => {
    localStorage.setItem("quizType", JSON.stringify(quizType));
}

settingBtn.addEventListener("click", () => {
    settingsContainer.classList.toggle("hidden");
})

applyBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (numQuestions.value <= numQuestions.getAttribute("max")){
    const MAX_QUESTIONS = numQuestions.value;
    console.log(MAX_QUESTIONS);
    localStorage.setItem("MAX_QUESTIONS", MAX_QUESTIONS);
    } else {
        alert("Type in a value that is within the range of number of questions in the set.");
    }
})