# PDF-QnA-Generator

An experimental AI-powered tool that takes content from PDF files (like study notes, textbooks, or lectures) and generates quiz-style questions to help users review and understand key ideas.
## Disclaimer

This is a personal/learning project. While it works, the AI output and system behavior can be inconsistent at times. The goal is to explore how large language models can assist in educational content generation.

---

- Extracts text from PDF content
- Sends that text to an AI model (via OpenRouter API)
- Returns 5–6 thoughtful questions based on the key ideas in the document
- Designed to be lightweight and easily testable with a frontend

---

## Tech Stack

- **Backend**: Node.js + Express
- **AI Provider**: OpenRouter API (LLaMA 4 Scout, GPT-4o, etc.)
- **Frontend**: You can plug in your own (React, Next.js, etc.)

---

## Current Limitations

- Sometimes the AI does not return exactly 6 questions
- Some outputs may include extra commentary
- No database or file management (yet)
- Text extraction from PDFs is assumed to be handled on the frontend

## Test File
[test.pdf](https://github.com/user-attachments/files/19833089/test.pdf)
## Example Output
![image](https://github.com/user-attachments/assets/eee191f8-5343-446f-92ff-5833d72e4de4)


