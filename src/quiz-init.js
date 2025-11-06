const quizTitle = document.getElementById('quiz-title');

const topicLinks = [...document.getElementsByClassName("topic-link")];
const numQuestions = document.getElementById("num-questions");

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
    console.log(numQuestions.getAttribute("max"));
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
