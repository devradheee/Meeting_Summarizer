import React, { useState } from 'react';
import './App.css';

function App() {
  const [transcript, setTranscript] = useState('');
  const [prompt, setPrompt] = useState('Summarize in bullet points for executives');
  const [summary, setSummary] = useState('');
  const [recipients, setRecipients] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [shareMessage, setShareMessage] = useState('');

  const handleGenerateSummary = async () => {
    if (!transcript.trim()) {
      setError('Please provide a transcript.');
      return;
    }
    setIsLoading(true);
    setError('');
    setSummary('');

    try {
      const response = await fetch('http://localhost:5001/api/summary/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript, prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary.');
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareSummary = async () => {
    if (!summary.trim() || !recipients.trim()) {
      setShareMessage('Please generate a summary and provide recipient emails.');
      return;
    }

    const recipientList = recipients.split(',').map(email => email.trim());

    try {
      const response = await fetch('http://localhost:5001/api/summary/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ summary, recipients: recipientList }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to share summary.');
      }

      setShareMessage(data.message);
    } catch (err) {
      setShareMessage(err.message);
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Meeting Notes Summarizer</h1>
      </header>
      <main className="container">
        <div className="input-section">
          <h2>1. Upload Transcript</h2>
          <textarea
            placeholder="Paste your meeting transcript here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          ></textarea>
        </div>

        <div className="input-section">
          <h2>2. Set Custom Instruction</h2>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <button onClick={handleGenerateSummary} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Summary'}
        </button>

        {error && <p className="error-message">{error}</p>}

        <div className="output-section">
          <h2>3. Review and Edit Summary</h2>
          <textarea
            placeholder="Your summary will appear here..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            readOnly={!summary}
          ></textarea>
        </div>

        <div className="share-section">
          <h2>4. Share Summary</h2>
          <input
            type="text"
            placeholder="Enter recipient emails, separated by commas"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
          />
          <button onClick={handleShareSummary} disabled={!summary}>Share via Email</button>
          {shareMessage && <p className="share-message">{shareMessage}</p>}
        </div>
      </main>
    </div>
  );
}

export default App;
