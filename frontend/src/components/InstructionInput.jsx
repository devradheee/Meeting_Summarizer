import React from "react";

export default function InstructionInput({ instruction, setInstruction }) {
  return (
    <div className="card">
      <h2>2. Set Custom Instruction</h2>
      <input
        type="text"
        placeholder='e.g., "Summarize in bullet points for executives"'
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
      />
    </div>
  );
}
