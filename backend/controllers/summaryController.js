const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateSummary = async (req, res) => {
    const { transcript, prompt } = req.body;

    if (!transcript || !prompt) {
        return res.status(400).json({ error: 'Transcript and prompt are required.' });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const fullPrompt = `${prompt}:\n\n${transcript}`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const summary = response.text();

        res.json({ summary });
    } catch (error) {
        console.error('Error generating summary:', error);
        res.status(500).json({ error: 'Failed to generate summary.' });
    }
};

const shareSummary = (req, res) => {
    const { summary, recipients } = req.body;

    if (!summary || !recipients || !Array.isArray(recipients) || recipients.length === 0) {
        return res.status(400).json({ error: 'Summary and a list of recipients are required.' });
    }

    try {
        // In a real application, you would integrate an email service here.
        // For this example, we'll just log the action to the console.
        console.log(`Sharing summary with: ${recipients.join(', ')}`);
        console.log('Summary:', summary);

        // Simulate a successful email send
        res.json({ message: 'Summary shared successfully (simulated).' });
    } catch (error) {
        console.error('Error sharing summary:', error);
        res.status(500).json({ error: 'Failed to share summary.' });
    }
};


module.exports = {
    generateSummary,
    shareSummary
};
