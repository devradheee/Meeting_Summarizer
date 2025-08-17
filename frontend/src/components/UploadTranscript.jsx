import React from "react";

export default function UploadTranscript({ transcript, setTranscript }) {
  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setTranscript(String(ev.target.result || ""));
    reader.readAsText(f); // .txt files
  };

  return (
    <div className="card">
      <h2>1. Upload Transcript</h2>
      <small className="muted">Paste text or upload a .txt file.</small>
      <textarea
        rows={10}
        placeholder="Paste transcript here…"
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <input type="file" accept=".txt,text/plain" onChange={onFile} />
        <button className="btn" onClick={() => setTranscript("")}>
          Clear
        </button>
      </div>
    </div>
  );
}
