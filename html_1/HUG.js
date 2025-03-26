// Placeholder for API key
const AI_API_KEY = "AIzaSyCMYx2IQ2tO1lKqGmm187NixBlMSZeRAtc";

let currentQuestionIndex = 0;
let score = 0;

// Accessing DOM elements
const quizQuestionElement = document.getElementById("quizQuestion");
const quizOptionsElement = document.getElementById("quizOptions");
const quizFeedbackElement = document.getElementById("quizFeedback");
const nextQuestionButton = document.getElementById("nextQuestionBtn");

// Function to fetch a question from the API
async function fetchQuestion() {
    try {
        const response = await fetch('/api/generate_question', { // Assuming an API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_API_KEY}` // Include the API key
            },
            body: JSON.stringify({
                category: 'HUG' // You can change the category as needed
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching question:', error);
        // Handle the error (e.g., display an error message to the user)
        quizQuestionElement.textContent = "Error fetching question. Please try again.";
        quizOptionsElement.innerHTML = ''; // Clear options
        return null;
    }
}

// Function to show the current question
async function showQuestion() {
    const currentQuestionData = await fetchQuestion();

    if (currentQuestionData) {
        quizQuestionElement.textContent = currentQuestionData.question;

        // Clear previous options
        quizOptionsElement.innerHTML = '';

        // Create a button for each option
        currentQuestionData.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("quiz-option");
            button.addEventListener("click", () => checkAnswer(option, currentQuestionData.correctAnswer));
            quizOptionsElement.appendChild(button);
        });
    }
}

// Function to check the answer
function checkAnswer(selectedAnswer, correctAnswer) {
    // Display feedback
    if (selectedAnswer === correctAnswer) {
        quizFeedbackElement.textContent = "Correct!";
        score++;
    } else {
        quizFeedbackElement.textContent = "Incorrect! The correct answer is: " + correctAnswer;
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

    // No need to check quizQuestions.length anymore, as questions are fetched dynamically
    showQuestion();
    quizFeedbackElement.textContent = "";  // Clear previous feedback
    nextQuestionButton.style.display = "none";  // Hide next question button until answer is selected
});

// Initialize quiz by showing the first question
showQuestion();
