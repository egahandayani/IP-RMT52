const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const gemini = async (prompt) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("Error generating content:", err);
    throw err;
  }
};

module.exports = gemini;
