const quizTitle = document.getElementById('quiz-title');

const algebraLink = document.getElementById('algebra-link');
const vocabLink = document.getElementById('vocab-link');
const historyLink = document.getElementById('history-link');

let quizType = JSON.parse(localStorage.getItem('quizType'));

const setTitle = () => {
    quizTitle.innerText = `${quizType[0].toUpperCase() + quizType.slice(1)} Quiz`;
}
setTitle();
algebraLink.addEventListener("click", () => {
    quizType = "algebra";
    setTitle();
    setQuizType();
});
vocabLink.addEventListener("click", () => {
    quizType = "vocabulary";
    setTitle();
    setQuizType();
});
historyLink.addEventListener("click", () => {
    quizType = "history";
    setTitle();
    setQuizType();
});

const setQuizType = () => {
    localStorage.setItem("quizType", JSON.stringify(quizType));
}
