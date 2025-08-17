import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

// ---- OpenAI client ----
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ---- Health check ----
app.get("/api/health", (_req, res) => {
    res.json({ ok: true, time: new Date().toISOString() });
});

// ---- Summarize endpoint ----
app.post("/api/summarize", async (req, res) => {
    try {
        const { transcript, instruction } = req.body || {};
        if (!transcript || typeof transcript !== "string" || !transcript.trim()) {
            return res.status(400).json({ error: "Transcript is required" });
        }
        const userInstruction = instruction?.trim() || "Summarize key points and action items.";

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant that produces concise, well-structured meeting summaries." },
                {
                    role: "user",
                    content:
                        `Instruction: ${userInstruction}\n` +
                        `Transcript:\n"""${transcript.substring(0, 20000)}"""` // guard length
                }
            ],
            temperature: 0.2,
            max_tokens: 600
        });

        const summary = completion.choices?.[0]?.message?.content?.trim() || "";
        if (!summary) return res.status(500).json({ error: "Empty summary from model" });

        res.json({ summary });
    } catch (err) {
        console.error("Summarize error:", err);
        res.status(500).json({ error: "Failed to summarize" });
    }
});

// ---- Email share endpoint ----
app.post("/api/share", async (req, res) => {
    try {
        const { to, subject, summary } = req.body || {};
        if (!to || !summary) return res.status(400).json({ error: "Recipient (to) and summary are required" });

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const mail = await transporter.sendMail({
            from: process.env.MAIL_FROM || process.env.SMTP_USER,
            to,
            subject: subject || "Meeting Summary",
            text: summary,
            html: `<pre style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; white-space: pre-wrap;">${summary}</pre>`
        });

        res.json({ ok: true, id: mail.messageId });
    } catch (err) {
        console.error("Email error:", err);
        res.status(500).json({ error: "Failed to send email" });
    }
});

const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
