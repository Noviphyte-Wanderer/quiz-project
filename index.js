const algebraLink = document.getElementById('algebra-link');
const vocabLink = document.getElementById('vocab-link');
const historyLink = document.getElementById('history-link');

let quizType = "";

algebraLink.addEventListener("click", () => {
    quizType = "algebra";
    setQuizType();
});
vocabLink.addEventListener("click", () => {
    quizType = "vocabulary";
    setQuizType();
});
historyLink.addEventListener("click", () => {
    quizType = "history";
    setQuizType();
});

const setQuizType = () => {
    localStorage.setItem("quizType", JSON.stringify(quizType));
}
