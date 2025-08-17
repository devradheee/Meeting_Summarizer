# AI Meeting Notes Summarizer

A full-stack Web application that uses generative AI to summarize meeting transcripts based on custom user instructions. Users can upload a text file, generate a summary, edit it, and share it.

## Features

-   **Upload Transcript**: Paste text directly or upload a `.txt` file.
-   **Custom Prompts**: Guide the AI with specific instructions (e.g., "Summarize for executives," "List all action items").
-   **AI-Powered Summarization**: Leverages the Google Gemini API to generate concise and relevant summaries.
-   **Editable Summaries**: Review and modify the AI-generated summary before sharing.
-   **Share via Email**: Send the final summary to a list of recipients (simulated).

---

## Tech Stack

-   **Frontend**: React.js
-   **Backend**: Node.js, Express.js
-   **AI**: Google Gemini API

---

## Setup and Installation

Follow these steps to get the project running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (which includes npm)
-   A Google Gemini API Key. You can get one from [Google AI Studio](https://aistudio.google.com/).

### 1. Clone the Repository

```bash
git clone https://github.com/devradheee/Meeting_Summarize.git
cd meeting-summarizer
```

### 2. Backend Setup

Navigate to the backend directory and install the required dependencies.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add your API key:

```
PORT=5000
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

Start the backend server:

```bash
npm run dev
```

The server will be running on `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install its dependencies.

```bash
cd frontend
npm install
```

Start the React development server:

```bash
npm start
```

The application will open in your browser at `http://localhost:5173`.

---

## How to Use

1.  **Provide a Transcript**: Either paste the text from your meeting notes into the large text area or click the "Upload File" button to select a `.txt` file.
2.  **Set an Instruction**: Modify the default prompt in the "Set Custom Instruction" field to guide the AI.
3.  **Generate Summary**: Click the "Generate Summary" button.
4.  **Review and Edit**: The generated summary will appear in the third section. You can click into this text area and make any necessary edits.
5.  **Share**: Enter one or more email addresses (separated by commas) in the final input field and click "Share via Email".
