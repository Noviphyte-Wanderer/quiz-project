const topicLinks = [...document.getElementsByClassName("topic-link")];

let quizType = "";

topicLinks.forEach(topic => {
    const topicRegex = /[a-zA-z]+(?=\-link)/g;
    topic.addEventListener("click", (e) => {
        quizType = e.target.id.match(topicRegex)[0];
        setTitle();
        setQuizType();
    })
});

const setQuizType = () => {
    localStorage.setItem("quizType", JSON.stringify(quizType));
}
