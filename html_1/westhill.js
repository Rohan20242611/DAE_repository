

// Sophisticated response generation logic
function getChaptGptResponse(input) {
    const userInput = input.toLowerCase();

    const responses = {
        hello: ["Greetings! How may I assist you today?", "Hello there! I'm ChaptGpt-5.0, ready to help.", "Hi! Need any help?"],
        help: ["I can assist with coding, math, writing, and more. What do you need?", "I'm here to help! Ask me anything."],
        default: ["I've analyzed your input. How would you like to proceed?"],
        
    };

    let category = "default";
    if (userInput.includes("hello") || userInput.includes("hi") || userInput.includes("hey")) {
        category = "hello";
    } else if (userInput.includes("help") || userInput.includes("assist") || userInput.includes("what can you do")) {
        category = "help";
    }

    const possibleResponses = responses[category];
    return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
}

// Review System
function submitReview() {
    const reviewInput = document.getElementById("reviewInput").value.trim();
    const review = parseInt(reviewInput);

    if (isNaN(review) || review < 1 || review > 10) {
        alert("Please enter a valid integer between 1 and 10.");
        return;
    }

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    updateAverageReview();
}

// Calculate and update the average review
function updateAverageReview() {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    if (reviews.length === 0) {
        document.getElementById("averageReview").textContent = "No reviews yet";
        return;
    }

    const sum = reviews.reduce((acc, review) => acc + review, 0);
    const average = sum / reviews.length;
    document.getElementById("averageReview").textContent = average.toFixed(2);
}

// Clear all reviews
function clearReviews() {
    localStorage.removeItem("reviews");
    document.getElementById("averageReview").textContent = "No reviews yet";
}

// Call update function on page load
window.onload = updateAverageReview;
