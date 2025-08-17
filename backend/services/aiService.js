const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function summarizeText(transcript, prompt) {
    const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a meeting summarizer." },
            { role: "user", content: `Transcript: ${transcript}\nInstruction: ${prompt || "Summarize in key points"}` },
        ],
    });

    return completion.choices[0].message.content;
}

module.exports = { summarizeText };
