// AP Computer Science A Quiz Questions
const APCSAQuestions = [
    {
        question: "Consider the following code segment: int x = 5; System.out.println(x++);",
        options: [
            "The code will print 5 and then 6",
            "The code will print 6 and then 5", 
            "The code will result in a compile-time error",
            "The code will print 5 twice"
        ],
        correctAnswer: "The code will print 5 and then 6",
        explanation: "The post-increment operator (x++) returns the current value before incrementing. So first 5 is printed, then x becomes 6."
    },
    {
        question: "Which exception is thrown when you try to access an array index that doesn't exist?",
        options: [
            "NullPointerException", 
            "ArrayIndexOutOfBoundsException", 
            "IndexOutOfBoundsException", 
            "ArrayException"
        ],
        correctAnswer: "ArrayIndexOutOfBoundsException",
        explanation: "ArrayIndexOutOfBoundsException is thrown when attempting to access an array with an invalid index."
    }
];

let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;
let timeRemaining = 200; // 3 minutes and 20 seconds  total
let questionTimeRemaining = 50; // 50 seconds per question
let timerInterval;
let questionTimerInterval;

// DOM Elements
const quizContainer = document.getElementById("quiz-container");
const quizQuestionElement = document.getElementById("quizQuestion");
const quizOptionsElement = document.getElementById("quizOptions");
const quizFeedbackElement = document.getElementById("quizFeedback");
const nextQuestionButton = document.getElementById("nextQuestionBtn");
const scoreDisplayElement = document.getElementById("scoreDisplay");
const timerElement = document.getElementById("timer");
const questionTimerElement = document.getElementById("questionTimer");

// Enhanced Timer Function
function startTimer() {
    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        
        timerElement.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
        
        timeRemaining--;
    }, 1000);
}

// Question Timer Function
function startQuestionTimer() {
    questionTimeRemaining = 50; // Reset to 30 seconds
    questionTimerElement.style.width = '100%';
    questionTimerElement.style.backgroundColor = '#3498db';

    clearInterval(questionTimerInterval);
    questionTimerInterval = setInterval(() => {
        questionTimeRemaining--;
        
        // Update timer bar width
        const percentage = (questionTimeRemaining / 50) * 100;
        questionTimerElement.style.width = `${percentage}%`;

        // Change color as time runs out
        if (questionTimeRemaining <= 10) {
            questionTimerElement.style.backgroundColor = '#e74c3c';
        }

        if (questionTimeRemaining <= 0) {
            clearInterval(questionTimerInterval);
            handleQuestionTimeout();
        }
    }, 1000);
}

// Handle Question Timeout
function handleQuestionTimeout() {
    const currentQuestionData = APCSAQuestions[currentQuestionIndex];
    
    // Show feedback for missed question
    quizFeedbackElement.innerHTML = `
        <div class="feedback incorrect">
            <h3>Time's Up! ⏰</h3>
            <p>The correct answer was: ${currentQuestionData.correctAnswer}</p>
            <p>${currentQuestionData.explanation}</p>
        </div>
    `;
    quizFeedbackElement.style.color = "red";

    // Disable options
    const options = document.querySelectorAll(".quiz-option");
    options.forEach(option => option.disabled = true);

    // Show next question button
    nextQuestionButton.style.display = "inline";
}

// End Quiz Function
function endQuiz() {
    clearInterval(questionTimerInterval);
    quizContainer.innerHTML = `
        <div class="quiz-end">
            <h2>Quiz Completed!</h2>
            <p>Your Final Score: ${score}/${totalQuestions}</p>
            <p>Percentage: ${((score/totalQuestions) * 100).toFixed(2)}%</p>
            <button onclick="location.reload()" class="restart-btn">Restart Quiz</button>
        </div>
    `;
}

// Function to show the current question
function showQuestion() {
    // Ensure we cycle through questions
    if (currentQuestionIndex >= APCSAQuestions.length) {
        currentQuestionIndex = 0;
    }

    const currentQuestionData = APCSAQuestions[currentQuestionIndex];
    
    // Update question text
    quizQuestionElement.textContent = currentQuestionData.question;
    
    // Clear previous options
    quizOptionsElement.innerHTML = '';
    
    // Create a button for each option with enhanced styling
    currentQuestionData.options.forEach((option, index) => {
        const button = document.createElement("button");
        const optionLetters = ['A', 'B', 'C', 'D'];
        button.textContent = `${optionLetters[index]}) ${option}`;
        button.classList.add("quiz-option");
        button.setAttribute('data-option', optionLetters[index]);
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.05)';
            button.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = 'none';
        });
        button.addEventListener("click", () => {
            clearInterval(questionTimerInterval);
            checkAnswer(
                optionLetters[index], 
                currentQuestionData.correctAnswer, 
                currentQuestionData.explanation
            );
        });
        quizOptionsElement.appendChild(button);
    });

    totalQuestions++;
    updateScoreDisplay();
    startQuestionTimer(); // Start the per-question timer
}

// Function to check the answer
function checkAnswer(selectedAnswer, correctAnswer, explanation) {
    // Highlight correct and selected answers
    const options = document.querySelectorAll(".quiz-option");
    options.forEach(option => {
        const optionText = option.textContent.split(') ')[1];
        if (optionText === correctAnswer) {
            option.style.backgroundColor = '#4CAF50';
            option.style.color = 'white';
        }
        option.disabled = true;
    });

    // Display feedback
    if (selectedAnswer.trim() === correctAnswer.trim()) {
        quizFeedbackElement.innerHTML = `
            <div class="feedback correct">
                <h3>Correct! 🎉</h3>
                <p>${explanation}</p>
            </div>
        `;
        quizFeedbackElement.style.color = "green";
        score++;
    } else {
        quizFeedbackElement.innerHTML = `
            <div class="feedback incorrect">
                <h3>Incorrect! ❌</h3>
                <p>The correct answer is: ${correctAnswer}</p>
                <p>${explanation}</p>
            </div>
        `;
        quizFeedbackElement.style.color = "red";
    }

    updateScoreDisplay();
    nextQuestionButton.style.display = "inline";
}

// Function to update score display
function updateScoreDisplay() {
    scoreDisplayElement.textContent = `Score: ${score}/${totalQuestions}`;
}

// Event listener for the "Next Question" button
nextQuestionButton.addEventListener("click", () => {
    currentQuestionIndex++;
    showQuestion();
    quizFeedbackElement.textContent = "";
    nextQuestionButton.style.display = "none";
});

// Initialize quiz
document.addEventListener('DOMContentLoaded', () => {
    startTimer();
    showQuestion();
});