// const themeToggle = document.getElementById('themetoggle');
// const body = document.body;

// themeToggle.addEventListener('click', () => {
//     body.classList.toggle('dark-theme');
// });
// JUST IN CASE OF A THEME CHANGING WEB APP USE THE ABOVE


const questions = [
    {
        question: "What is the capital city of France?",
        answer: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Rome", correct: false },
            { text: "Paris", correct: true }
        ]
    },
    {
        question: `Which planet is known as the "Red Planet?"`,
        answer: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the largest mammal on Earth?",
        answer: [
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Tiger", correct: false }
        ]
    },
    {
        question: `Who wrote the play "Romeo and Juliet"?`,
        answer: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Jane Austen", correct: false },
            { text: "Oscar Wilde", correct: false }
        ]
    },
    {
        question: `Which element has the chemical symbol "O"?`,
        answer: [
            { text: "Oxygen", correct: true },
            { text: "Gold", correct: false },
            { text: "Silver", correct: false },
            { text: "Iron", correct: false }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('options');
const nextButton = document.getElementById('nextbtn');

let questionIndex = 0;
let score = 0;

function startQuiz() {
    questionIndex = 0;
    score = 0;
    nextButton.innerHTML = "NEXT";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[questionIndex];
    let quesNumber = questionIndex + 1;
    questionElement.innerHTML = quesNumber + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    }
    else {
        selectedBtn.classList.add('incorrect');
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    questionIndex++;
    if (questionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (questionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});

startQuiz();