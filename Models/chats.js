const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chats = mongoose.model("Chat", chatSchema);
module.exports = chats;
