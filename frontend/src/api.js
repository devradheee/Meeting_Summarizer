
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function summarize(transcript, instruction) {
    const res = await fetch(`${API_BASE}/api/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript, instruction })
    });
    if (!res.ok) throw new Error((await res.json()).error || "Failed to summarize");
    return res.json(); // { summary }
}

export async function shareEmail(to, subject, summary) {
    const res = await fetch(`${API_BASE}/api/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, summary })
    });
    if (!res.ok) throw new Error((await res.json()).error || "Failed to send");
    return res.json(); // { ok, id }
};

