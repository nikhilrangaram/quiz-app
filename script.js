Questions =[
    {
        question : "What does CPU stand for?",
        answers : [
            { text: "Central Processing Unit", correct: true},
            { text: "Computer Peripheral Unit", correct: false},
            { text: "Control Processing Unit", correct: false},
            { text: "Central Program Unit", correct: false}
        ]
    },
    {
        question : "Which programming language is often used for web development?",
        answers : [
            { text: "Java", correct: false},
            { text: "Python", correct: false},
            { text: "HTML", correct: true},
            { text: "C++", correct: false}
        ]
    },
    {
        question : "What does HTML stand for?",
        answers : [
            { text: "Hyper Text Markup Language", correct: true},
            { text: "High-level Text Machine Language", correct: false},
            { text: "Hyperlink and Text Markup Language", correct: false},
            { text: "Home Tool Markup Language", correct: false}
        ]
    },
    {
        question : "Which data structure uses the \"Last-In-First-Out\" (LIFO) principle?",
        answers : [
            { text: "Queue", correct: false},
            { text: "Stack", correct: true},
            { text: "Linked List", correct: false},
            { text: "Array", correct: false}
        ]
    },
    {
        question : "What does \"URL\" stand for?",
        answers : [
            { text: "Universal Resource Locator", correct: true},
            { text: "Uniform Resource Link", correct: false},
            { text: "Universal Resource Link", correct: false},
            { text: "Uniform Resource Locator", correct: false}
        ]
    },
    {
        question : "Which programming language is known for its use in data analysis and machine learning?",
        answers : [
            { text: "Ruby", correct: false},
            { text: "JavaScript", correct: false},
            { text: "R", correct: true},
            { text: "Swift", correct: false}
        ]
    },
    {
        question : "What is the primary purpose of an operating system?",
        answers : [
            { text: "To run applications", correct: false},
            { text: "To manage hardware resources", correct: true},
            { text: "To create user interfaces", correct: false},
            { text: "To store data", correct: false}
        ]
    },
    {
        question : "In binary code, what does \"1010\" represent in decimal?",
        answers : [
            { text: "5", correct: false},
            { text: "8", correct: false},
            { text: "10", correct: true},
            { text: "12", correct: false}
        ]
    },
    {
        question : "What does SQL stand for?",
        answers : [
            { text: "Structured Query Language", correct: true},
            { text: "Sequential Query Language", correct: false},
            { text: "System Query Language", correct: false},
            { text: "Simple Query Logic", correct: false}
        ]
    },
    {
        question : "Average time complexity for merge sort?",
        answers : [
            { text: "O(n²)", correct: false},
            { text: "O(nlogn)", correct: true},
            { text: "O(n)", correct: false},
            { text: "O(logn)", correct: false}
        ]
    }
];


const questionElement =  document.getElementById("question");
const answerButtons =  document.getElementById("answer-buttons");
const nextButton =  document.getElementById("next-btn");

let curr_ques_idx = 0;
let score = 0;

function startQuiz(){
    curr_ques_idx = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let curr_ques = Questions[curr_ques_idx];
    let ques_number = curr_ques_idx+1;
    questionElement.innerHTML = ques_number + "." + curr_ques.question;

    curr_ques.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${Questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    curr_ques_idx++;
    if(curr_ques_idx < Questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(curr_ques_idx < Questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});
startQuiz();


