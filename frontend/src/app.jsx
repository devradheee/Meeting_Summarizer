import React, { useState } from "react";
import UploadTranscript from "./components/UploadTranscript.jsx";
import InstructionInput from "./components/InstructionInput.jsx";
import SummaryEditor from "./components/SummaryEditor.jsx";
import ShareByEmail from "./components/ShareByEmail.jsx";
import { summarize, shareEmail } from "./api.js";

export default function App() {
  const [transcript, setTranscript] = useState("");
  const [instruction, setInstruction] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setToast("");
      const { summary } = await summarize(transcript, instruction);
      setSummary(summary);
    } catch (e) {
      setToast(e.message || "Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async ({ to, subject, summary }) => {
    try {
      setToast("");
      const resp = await shareEmail(to, subject, summary);
      if (resp.ok) setToast(`✅ Sent to ${to}`);
    } catch (e) {
      setToast(`❌ ${e.message || "Failed to send email"}`);
    }
  };

  return (
    <div className="container">
      <h1>AI Meeting Notes Summarizer</h1>
      <small className="muted">
        Upload → Instruct → Generate → Edit → Share
      </small>

      <UploadTranscript transcript={transcript} setTranscript={setTranscript} />
      <InstructionInput
        instruction={instruction}
        setInstruction={setInstruction}
      />
      <SummaryEditor
        summary={summary}
        setSummary={setSummary}
        onGenerate={handleGenerate}
        loading={loading}
      />
      <ShareByEmail summary={summary} onSend={handleSend} />
      {toast && (
        <div className="card">
          <small>{toast}</small>
        </div>
      )}
    </div>
  );
}
