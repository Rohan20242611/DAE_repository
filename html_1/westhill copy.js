async function sendMessage() {
    console.log("Button clicked!");
    try {
        const userInput = document.getElementById("chatInput").value.trim();
        if (!userInput) return; // Prevent empty messages

        const chatbox = document.getElementById("chatbox");

        // Display user message
        const userMessage = document.createElement("p");
        userMessage.className = "user-message";
        userMessage.textContent = "You: " + userInput;
        chatbox.appendChild(userMessage);

        // Show "typing" animation
        const loadingMessage = document.createElement("div");
        loadingMessage.className = "bot-message typing-indicator";
        loadingMessage.innerHTML = "<span></span><span></span><span></span>";
        chatbox.appendChild(loadingMessage);

        // Simulate API response delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        chatbox.removeChild(loadingMessage);

        // Get sophisticated hardcoded response
        const responseText = getChaptGptResponse(userInput);

        // Display bot response with typing effect
        const botMessage = document.createElement("p");
        botMessage.className = "bot-message";
        botMessage.textContent = "ChaptGpt-5.0: ";
        chatbox.appendChild(botMessage);

        const words = responseText.split(" ");
        for (let i = 0; i < words.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 50));
            botMessage.textContent += words[i] + " ";
            chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to bottom
        }

        // Clear input field after sending
        document.getElementById("chatInput").value = "";

    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again later.");
    }
}

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
