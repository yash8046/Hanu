import axios from 'axios';

// Slack Webhook URL
const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

export default async function handler(req, res) {
    // Only handle POST requests
    if (req.method === 'POST') {
        const { userName, userMobile, userEmail, studyLocation, degreeType } = req.body;

        const message = `New Study Abroad Application:
            Name: ${userName}
            Mobile: ${userMobile}
            Email: ${userEmail}
            Study Location: ${studyLocation}
            Degree Type: ${degreeType}`;

        try {
            const response = await axios.post(SLACK_WEBHOOK_URL, { text: message });
            return res.status(200).json({ success: true, message: 'Message sent to Slack', data: response.data });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to send message to Slack', error: error.message });
        }
    } else {
        // Only allow POST requests
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
