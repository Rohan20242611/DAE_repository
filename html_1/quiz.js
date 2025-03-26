// Sample questions for the quiz
const quizQuestions = [
    {
        question: "What is the length of the Great Wall of China?",
        options: [
            "5,000 miles",
            "13,000 miles",  // correct answer
            "20,000 miles",
            "10,000 miles"
        ],
        correctAnswer: "13,000 miles"
    },
    {
        question: "Who was the last active ruler of the Ptolemaic Kingdom of Egypt?",
        options: [
            "Alexander the Great",
            "Julius Caesar",
            "Cleopatra",  // correct answer
            "Nefertiti"
        ],
        correctAnswer: "Cleopatra"
    },
    {
        question: "Which human-made object was the first to reach space?",
        options: [
            "V-2 rocket",  // correct answer
            "Apollo 11",
            "Sputnik 1",
            "Hubble Space Telescope"
        ],
        correctAnswer: "V-2 rocket"
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Accessing DOM elements
const quizQuestionElement = document.getElementById("quizQuestion");
const quizOptionsElement = document.getElementById("quizOptions");
const quizFeedbackElement = document.getElementById("quizFeedback");
const nextQuestionButton = document.getElementById("nextQuestionBtn");

// Function to show the current question
function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    quizQuestionElement.textContent = currentQuestion.question;
    
    // Clear previous options
    quizOptionsElement.innerHTML = '';
    
    // Create a button for each option
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("quiz-option");
        button.addEventListener("click", () => checkAnswer(option));
        quizOptionsElement.appendChild(button);
    });
}

// Function to check the answer
function checkAnswer(selectedAnswer) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    // Display feedback
    if (selectedAnswer === currentQuestion.correctAnswer) {
        quizFeedbackElement.textContent = "Correct!";
        score++;
    } else {
        quizFeedbackElement.textContent = "Incorrect! The correct answer is: " + currentQuestion.correctAnswer;
    }
    
    // Disable options after selecting an answer
    const options = document.querySelectorAll(".quiz-option");
    options.forEach(option => {
        option.disabled = true;
    });
    
    nextQuestionButton.style.display = "inline";  // Show the next question button
}

// Event listener for the "Next Question" button
nextQuestionButton.addEventListener("click", () => {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
        quizFeedbackElement.textContent = "";  // Clear previous feedback
        nextQuestionButton.style.display = "none";  // Hide next question button until answer is selected
    } else {
        quizFeedbackElement.textContent = "Quiz Over! Your score is: " + score + " / " + quizQuestions.length;
        nextQuestionButton.style.display = "none";  // Hide next question button at the end of the quiz
    }
});

// Initialize quiz by showing the first question
showQuestion();
