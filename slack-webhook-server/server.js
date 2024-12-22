const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Enable CORS to allow requests from the frontend
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

// Slack Webhook URL
const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

// POST route to handle sending messages to Slack
app.post('/sendSlackMessage', async (req, res) => {
    const { userName, userMobile, userEmail, studyLocation, degreeType } = req.body;

    // Validate required fields
    if (!userName || !userMobile || !userEmail || !studyLocation || !degreeType) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const message = `New Study Abroad Application:
    Name: ${userName}
    Mobile: ${userMobile}
    Email: ${userEmail}
    Study Location: ${studyLocation}
    Degree Type: ${degreeType}`;

    try {
        const response = await axios.post(SLACK_WEBHOOK_URL, { text: message });
        res.status(200).json({ success: true, message: 'Message sent to Slack', data: response.data });
    } catch (error) {
        console.error('Error sending message to Slack:', error.message);
        res.status(500).json({ success: false, message: 'Failed to send message to Slack', error: error.message });
    }
});

// Use dynamic port for deployment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
