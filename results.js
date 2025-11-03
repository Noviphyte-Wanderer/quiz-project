const resultPercentage = JSON.parse(localStorage.getItem("percentage"));


const percentage = document.getElementById('percentage');
const gradeText = document.getElementById('grade');

percentage.innerText = resultPercentage + "%";
gradeText.innerText = getGrade(resultPercentage);



const gradeColors = {
    "A+": "#0f0",
    "A": "#0b0",
    "A-": "#090",
    "B+": "#097",
    "B": "#09a",
    "B-": "#09c",
    "C+": "#09f",
    "C": "#06f",
    "C-": "#34d",
    "D+": "#62a",
    "D": "#918",
    "D-": "#b15",
    "F": "#f00"
}


function getGrade(score){
    switch (true) {
        case score >= 100:
            return "A+";
        case score >= 93 && score < 100:
            return "A";
        case score >= 90 && score < 93:
            return "A-";
        case score >= 87 && score < 90:
            return "B+";
        case score >= 83 && score < 80:
            return "B";
        case score >= 80 && score < 83:
            return "B-";
        case score >= 77 && score < 80:
            return "C+";
        case score >= 73 && score < 77:
            return "C";
        case score >= 70 && score < 73:
            return "C-";
        case score >= 67 && score < 70:
            return "D+";
        case score >= 63 && score < 67:
            return "D";
        case score >= 60 && score < 63:
            return "D-";
        default: 
            return "F";
    }
}

const styleScore = () => {
    gradeText.style.color = gradeColors[gradeText.textContent];
}

styleScore();