const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey:
    "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",
});

async function generateQuestions() {
  try {
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-4-scout:free",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content:
            "Generate 5 insightful questions based on the following text: This is a test.",
        },
      ],
    });

    console.log(completion);
  } catch (error) {
    console.error("Error generating questions:", error);
  }
}

generateQuestions();
