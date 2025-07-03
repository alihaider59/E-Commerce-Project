const axios = require("axios");

const chatbotReply = async (message) => {
  try {
    const aiRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AI_SECRET_KEY}`,
        },
      }
    );
    const aiReply = aiRes.data.choices[0].message.content;
    return aiReply;
  } catch (err) {
    console.error(
      "OpenAI error:",
      err.response?.status,
      err.response?.data || err.message
    );
  }
};
module.exports = chatbotReply;
