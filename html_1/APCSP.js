const quizQuestions = [
    {
        question: "To ignore common words, Akuchi needs to add a list called a stop word list containing those words. The algorithm should check each word against this list and skip counting if it matches a common word.",

        options: [
            "Iteration",
            "Selection",  
            "Sequencing",
            "None of the above"
        ],
        correctAnswer: "Selection"
    },
    {
        question: "How can the news website optimize its advertisement scheduling algorithm to maximize revenue without exceeding daily display limits, while reducing server time as the number of advertisers and articles increases?",
        options: [
            "Rewrite the algorithim in a different programing language.",
            "Rewrite the algorithim in fewer lines of code.",
            "Use a heuristic algorithim that suggests a advertisment schedule without the time constraint",  // correct answer
            "Exlode the.",
            "The variant remains unchanged, while the official language evolves with changes in government."
        ],
        correctAnswer: "The variant is spoken by commoners, while the official language is the king’s form of the language, taught in the grammar books."
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
