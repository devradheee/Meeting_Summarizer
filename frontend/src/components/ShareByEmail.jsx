import React, { useState } from "react";

export default function ShareByEmail({ summary, onSend }) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("Meeting Summary");

  return (
    <div className="card">
      <h2>4. Share by Email</h2>
      <input
        type="email"
        placeholder="recipient@example.com"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <div style={{ height: 8 }} />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <div style={{ height: 12 }} />
      <button
        className="btn primary"
        onClick={() => onSend({ to, subject, summary })}
        disabled={!summary || !to}
      >
        Send Email
      </button>
      {!summary && (
        <div style={{ marginTop: 8 }}>
          <small className="muted">Generate a summary before sending.</small>
        </div>
      )}
    </div>
  );
}
