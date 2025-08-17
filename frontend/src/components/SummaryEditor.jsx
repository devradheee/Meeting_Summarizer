import React from "react";

export default function SummaryEditor({
  summary,
  setSummary,
  onGenerate,
  loading,
}) {
  return (
    <div className="card">
      <h2>3. Review and Edit Summary</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <button className="btn primary" onClick={onGenerate} disabled={loading}>
          {loading ? "Generating…" : "Generate Summary"}
        </button>
        <button className="btn" onClick={() => setSummary("")}>
          Clear
        </button>
      </div>
      <textarea
        rows={12}
        placeholder="Your AI summary will appear here…"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
    </div>
  );
}
