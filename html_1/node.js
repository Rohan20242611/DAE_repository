// server.js - Backend for Gemini Chatbot
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Or use built-in fetch if Node.js v18+
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from public directory

// Your Gemini API key - stored securely in environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Gemini chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'API key not configured on server' });
    }
    
    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: message
            }]
          }]
        })
      }
    );
    
    const data = await response.json();
    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }
    
    const responseText = data.candidates[0].content.parts[0].text;
    res.json({ response: responseText });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to communicate with Gemini API' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});