import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "./App.css";

// Set the PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function UploadForm() {
  const [pdfText, setPdfText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [questions, setQuestions] = useState([]);

  // Handle PDF file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();

      reader.onload = async function () {
        const typedarray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let text = "";

        // Extract text from PDF
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const content = await page.getTextContent();

          // Group text items by Y position (line-wise)
          const lines = {};
          content.items.forEach((item) => {
            const y = Math.floor(item.transform[5]);
            if (!lines[y]) lines[y] = [];
            lines[y].push(item.str);
          });

          const sortedY = Object.keys(lines).sort((a, b) => b - a);
          const pageText = sortedY.map((y) => lines[y].join(" ")).join("\n");
          text += pageText + "\n\n";
        }

        setPdfText(text.trim());
      };

      reader.readAsArrayBuffer(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  // Simulate Q&A generation (replace with AI in future)
  const handleGenerateQuestions = async () => {
    try {
      const response = await fetch("http://localhost:5000/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: pdfText }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate questions");
      }

      const qna = await response.json();
      setQuestions(qna);
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("An error occurred while generating questions.");
    }
  };

  return (
    <div className="bg-[#2C2C2C] p-8 rounded-lg shadow-xl max-w-md mx-auto">
      <h2 className="text-3xl font-semibold text-white text-center mb-6">
        Upload your PDF
      </h2>
      <input
        type="file"
        accept="application/pdf"
        className="block w-full text-[#88304E] p-4 rounded-md border border-[#F7374F] focus:outline-none focus:ring-2 focus:ring-[#F7374F]"
        onChange={handleFileUpload}
      />

      {pdfText && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#F7374F] text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
          >
            Review Extracted Text
          </button>
        </div>
      )}

      {/* Modal for showing PDF text */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white text-black p-6 rounded-xl max-w-3xl w-full relative">
            <h3 className="text-xl font-bold mb-4 text-center">
              Extracted Text
            </h3>

            <div className="max-h-[60vh] overflow-auto whitespace-pre-wrap text-sm text-justify leading-relaxed p-4 mx-auto w-full">
              {pdfText}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-red-600 text-2xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {pdfText && (
        <div className="mt-6 text-center">
          <button
            onClick={handleGenerateQuestions}
            className="bg-[#88304E] text-white px-6 py-2 mt-4 rounded-md hover:bg-[#722c42] transition"
          >
            Generate Questions
          </button>
        </div>
      )}

      {questions.length > 0 && (
        <div className="mt-8 bg-white text-black p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4">Generated Questions</h3>
          <ul className="space-y-4 text-left">
            {questions.map((qna, index) => (
              <li key={index}>
                <p className="font-semibold">
                  Q{index + 1}: {qna.question}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-[#522546] text-white font-sans flex items-center justify-center p-6">
      <div className="text-center w-full max-w-4xl">
        <h1 className="text-5xl font-extrabold text-[#F7374F] mb-4">
          PDF to Q&A Generator
        </h1>
        <p className="text-xl mb-8 text-[#E0E0E0]">
          Upload a PDF to extract its content and start generating questions.
        </p>
        <UploadForm />
      </div>
    </div>
  );
}

export default App;
