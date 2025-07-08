//Import Models
const Chats = require("../../Models/chats");

//Get Chats
const getChat = async (req, res) => {
  try {
    const chat = await Chats.find({});
    if (chat.length === 0)
      return res.status(200).json({
        success: true,
        message: "No chats there",
        data: [],
        code: 200,
      });
    res.status(200).json({
      success: true,
      message: "All Chats",
      data: chat,
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      code: 500,
    });
  }
};

//Export Function
module.exports = { getChat };
