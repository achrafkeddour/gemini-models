const axios = require('axios');

// Define the API endpoint and API key
const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const apiKey = "AIzaSyBaHEgCo8WhAnnaZB3EtM60iLLkpBcL5U0";

// Welcome message
console.log("Welcome to the Q&A bot! Type your questions below (or type 'exit' to quit):");

// Continuous conversation loop
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = () => {
    rl.question("\nYour question: ", async (userInput) => {
        // Exit condition
        if (userInput.toLowerCase() === "exit") {
            console.log("Goodbye!");
            rl.close();
            return;
        }

        // Define the JSON payload with user input
        const data = {
            contents: [{
                parts: [{ text: userInput }]
            }]
        };

        try {
            // Send the POST request
            const response = await axios.post(`${url}?key=${apiKey}`, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // Extract the text response
            const responseData = response.data;
            if (responseData.candidates && responseData.candidates.length > 0) {
                const answer = responseData.candidates[0].content.parts[0].text;
                console.log(`Answer: ${answer}`);
            } else {
                console.log("No answer available.");
            }
        } catch (error) {
            console.error(`Error: ${error.response?.status || error.code}, ${error.response?.data || error.message}`);
        }

        // Prompt for the next question
        askQuestion();
    });
};

// Start the loop
askQuestion();
