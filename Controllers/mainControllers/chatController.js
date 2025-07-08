//Import Models
const Chats = require("../../Models/chats");
const runGemini = require("../../Utils/gemini");

//Open AI
const aiChatbot = async (req, res) => {
  try {
    const userId = req.user.profileId;
    const { message } = req.body;

    const gptReply = await runGemini(message);
    res.status(200).json({ success: true, reply: gptReply, code: 200 });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      code: 500,
    });
  }
};

//Get Chat of Room
const getChatRoom = async (req, res) => {
  try {
    const roomId = req.params.roomid;
    const chat = await Chats.find({ roomId });
    if (chat.length === 0)
      return res.status(200).json({
        success: true,
        message: "No chats for this room",
        data: [],
        code: 200,
      });
    res.status(200).json({
      success: true,
      message: "All Chats for this room",
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

//Get Chat of a Single User
const getChatUser = async (req, res) => {
  try {
    const senderId = req.user.profileId;
    const chat = await Chats.find({ senderId });
    if (chat.length === 0)
      return res.status(200).json({
        success: true,
        message: "No chats there",
        data: [],
        code: 200,
      });
    res.status(200).json({
      success: true,
      message: "All Chats for this user",
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

// Delete Chat
const delChatUser = async (req, res) => {
  try {
    const senderId = req.user.profileId;
    const chat = await Chats.deleteMany({ senderId });
    if (chat.deletedCount === 0)
      return res.status(404).json({
        success: false,
        message: "No chats found for this user",
        code: 404,
      });
    res.status(200).json({
      success: true,
      message: "All chat deleted",
      data: chat.deletedCount,
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


//Export Functions
module.exports = {
  aiChatbot,
  getChatRoom,
  getChatUser,
  delChatUser,
}