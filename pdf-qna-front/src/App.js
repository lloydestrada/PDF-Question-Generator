import React from "react";

// UploadForm component for PDF upload
function UploadForm() {
  return (
    <div className="bg-secondary p-8 rounded-lg shadow-xl max-w-md mx-auto">
      <h2 className="text-3xl font-semibold text-white text-center mb-6">
        Upload your PDF
      </h2>
      <input
        type="file"
        className="block w-full text-tertiary p-4 rounded-md border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

// Main App component
function App() {
  return (
    <div className="min-h-screen bg-background text-white font-sans flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-primary mb-4">
          PDF to Q&A Generator
        </h1>
        <p className="text-xl mb-6">
          Upload a PDF to generate quiz questions based on its content.
        </p>

        {/* Display the UploadForm component */}
        <UploadForm />
      </div>
    </div>
  );
}

export default App;
