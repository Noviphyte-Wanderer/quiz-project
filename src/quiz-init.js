const quizTitle = document.getElementById('quiz-title');

const topicLinks = [...document.getElementsByClassName("topic-link")];

let quizType = JSON.parse(localStorage.getItem('quizType'));

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
    })
})

const setQuizType = () => {
    localStorage.setItem("quizType", JSON.stringify(quizType));
}
