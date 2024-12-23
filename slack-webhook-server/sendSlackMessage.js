const axios = require('axios');

// Slack Webhook URL
const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    // Parse request body safely
    if (req.body && typeof req.body === 'string') {
        try {
            req.body = JSON.parse(req.body);
        } catch (error) {
            console.error('Failed to parse request body:', error);
            return res.status(400).json({ success: false, message: 'Invalid JSON in request body' });
        }
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

    try {
        console.log('Sending message to Slack...');
        const response = await axios.post(SLACK_WEBHOOK_URL, { text: message });
        console.log('Slack response:', response.data);

        res.status(200).json({ success: true, message: 'Message sent to Slack' });
    } catch (error) {
        console.error('Error sending message to Slack:', error);
        res.status(500).json({ success: false, message: 'Failed to send message to Slack', error: error.message });
    }
}
