const student = prompt("Are you a westhill student?");
if (student === "yes" || student === "Yes") {
    window.location.replace("start2.html");
} else {
    alert("Sorry you are a loser");
    window.location.replace("Start.html");
}
async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (!userInput) return;

    const chatbox = document.getElementById("chatbox");
    
    // Display user message
    const userMessage = document.createElement("p");
    userMessage.className = "user-message";
    userMessage.textContent = "You: " + userInput;
    chatbox.appendChild(userMessage);
    
    // Call Gemini API
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=YOUR_GEMINI_API_KEY", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            prompt: { text: userInput },
        })
    });

    const data = await response.json();
    const botReply = data.candidates?.[0]?.output || "Sorry, I couldn't understand that.";

    // Display bot response
    const botMessage = document.createElement("p");
    botMessage.className = "bot-message";
    botMessage.textContent = "Bot: " + botReply;
    chatbox.appendChild(botMessage);

    // Clear input
    document.getElementById("userInput").value = "";
}


