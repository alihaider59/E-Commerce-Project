
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const runGemini = async (userMessage) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(userMessage);
  const response = await result.response;
  const text = response.text();

  return text;
};

module.exports = runGemini;
