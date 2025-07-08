const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const upload = require("../../Middlewares/upload");
const verifyToken = require("../../Middlewares/verifyToken");
const {
  aiChatbot,
  getChatUser,
  delChatUser,
  getChatRoom,
} = require("../../Controllers/mainControllers/chatController");

// Chat Routes
router.get("/chat/user", verifyToken, getChatUser);
router.delete("/chat/user", verifyToken, delChatUser);
router.get("/chat/room/:roomid", verifyToken, getChatRoom);
router.post("/chatbot", verifyToken, upload.none(), aiChatbot);

module.exports = router;
