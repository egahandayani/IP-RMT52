const gemini = require("../helpers/gemini");

class GeminiController {
  static async getDisneyCharacters(req, res, next) {
    try {
      const { question } = req.body;
      const prompt = `tell me about ${question} character. Response must be paragraph format

        create without \`\`\` json and \`\`\` 
      `;
      const response = await gemini(prompt);

      res.status(200).json({ response });
    } catch (err) {
      console.log("🚀 ~ GeminiController ~ getDisneyCharacters ~ err:", err);
      next(err);
    }
  }
}

module.exports = GeminiController;
