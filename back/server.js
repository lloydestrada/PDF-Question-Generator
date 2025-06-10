const express = require("express");
const { OpenAI } = require("openai");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


const openai = new OpenAI({
  apiKey:
    "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",
  baseURL: "https://openrouter.ai/api/v1",
});

app.post("/generate-questions", async (req, res) => {
  try {
    const { text } = req.body;

    
    if (!text) {
      return res.status(400).json({ error: "Text is required." });
    }

    
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-4-scout:free",
      messages: [
        {
          role: "user",
          content: `
            Read the following text and generate 6 insightful and thought-provoking questions that test understanding of key ideas. 
            Only return the questions in a numbered list without explanations or extra commentary.

            Text:
            ${text}
          `,
        },
      ],
      extra_headers: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "PDF-QnA-Generator",
      },
    });

    
    const rawContent = completion.choices[0].message.content;

    const questions = rawContent
      .split(/\n?\d+\.\s+/) 
      .filter((q) => q.trim().length > 0)
      .map((q) => ({
        question: q.trim(),
        answer: "This is a placeholder answer.",
      }));

    
    res.json(questions);
  } catch (err) {
    console.error("OpenRouter API Error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      details: err?.message || "Unknown error",
    });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});