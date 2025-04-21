import React, { useState } from "react";

function App() {
  const [pdfFile, setPdfFile] = useState(null);

  const handleUpload = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    // This will be used to send file to backend
    console.log("Submitting:", pdfFile);
  };

  return (
    <div className="min-h-screen bg-[#2C2C2C] text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#F7374F]">
        PDF to Q&A Generator
      </h1>

      <div className="bg-[#522546] p-6 rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center space-y-4">
        <label className="w-full">
          <span className="block mb-2 text-[#F7374F] font-semibold">
            Upload your PDF
          </span>
          <input
            type="file"
            accept=".pdf"
            onChange={handleUpload}
            className="block w-full text-white bg-[#2C2C2C] border border-[#88304E] rounded px-4 py-2"
          />
        </label>

        <button
          onClick={handleSubmit}
          disabled={!pdfFile}
          className="bg-[#F7374F] hover:bg-[#88304E] text-white font-bold py-2 px-4 rounded transition-all duration-200 disabled:opacity-50"
        >
          Generate Questions
        </button>
      </div>

      <div className="mt-10 w-full max-w-2xl">
        <h2 className="text-xl text-[#F7374F] font-semibold mb-4">
          Generated Questions:
        </h2>
        <div className="text-gray-300 italic">
          [This area will show output later]
        </div>
      </div>
    </div>
  );
}

export default App;

