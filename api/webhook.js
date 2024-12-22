export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { text } = req.body; // Adjust based on your Slack payload
        console.log('Slack Payload:', text);

        // Send a response back to Slack
        res.status(200).json({ message: 'Webhook received!' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}
