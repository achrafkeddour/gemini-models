const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// API configuration
const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const apiKey = "AIzaSyBaHEgCo8WhAnnaZB3EtM60iLLkpBcL5U0";

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle questions
app.post('/ask', async (req, res) => {
    const userQuestion = req.body.question;

    if (!userQuestion) {
        return res.status(400).json({ error: "Question is required." });
    }

    const data = {
        contents: [{
            parts: [{ text: userQuestion }]
        }]
    };

    try {
        const response = await axios.post(`${apiUrl}?key=${apiKey}`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const candidates = response.data?.candidates;
        const answer = candidates && candidates.length > 0 ? candidates[0].content.parts[0].text : "No answer available.";

        res.json({ answer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get an answer." });
    }
});

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});