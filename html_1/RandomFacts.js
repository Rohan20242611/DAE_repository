<script>
    // Sample random facts array
    const facts = [
        "The Great Wall of China is over 13,000 miles long.",
        "Cleopatra was the last active ruler of the Ptolemaic Kingdom of Egypt.",
        "The Eiffel Tower can be 15 cm taller during the summer.",
        "The first human-made object to reach space was the V-2 rocket in 1944.",
        "Ancient Egyptians used a system of writing known as hieroglyphs."
    ];

    // Accessing the DOM elements
    const factElement = document.getElementById("HistoryFacts");
    const nextFactButton = document.getElementById("nextFactBtn");

    // Function to display a random fact
    function showRandomFact() {
        const randomIndex = Math.floor(Math.random() * facts.length);
        factElement.textContent = facts[randomIndex];
    }

    // Event listener for the "Next Fact" button
    nextFactButton.addEventListener("click", showRandomFact);
</script>
