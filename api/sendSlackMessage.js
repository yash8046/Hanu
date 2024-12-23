const axios = require('axios');

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        // Handle preflight requests
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.status(200).end();
        return;
    }

    try {
        res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (or specify your domain)

        if (req.method !== 'POST') {
            return res.status(405).json({ success: false, message: 'Method Not Allowed' });
        }

        const { userName, userMobile, userEmail, studyLocation, degreeType } = req.body;

        if (!userName || !userMobile || !userEmail || !studyLocation || !degreeType) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const message = `New Study Abroad Application:
            Name: ${userName}
            Mobile: ${userMobile}
            Email: ${userEmail}
            Study Location: ${studyLocation}
            Degree Type: ${degreeType}`;

        await axios.post(SLACK_WEBHOOK_URL, { text: message });

        res.status(200).json({ success: true, message: 'Message sent to Slack' });
    } catch (error) {
        console.error('Error in handler:', error.message, error.stack);
        res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
    }
}
