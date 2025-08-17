const { summarizeText } = require("../services/aiService");

const generateSummary = async (req, res) => {
    try {
        const { transcript, prompt } = req.body;

        if (!transcript) {
            return res.status(400).json({ error: "Transcript is required" });
        }

        const summary = await summarizeText(transcript, prompt);
        res.json({ summary });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { generateSummary };
