const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const upload = require("../../Middlewares/upload");
const isAdmin = require("../../Middlewares/adminMiddlewares/isAdmin");
const { getChat } = require("../../Controllers/adminControllers/chatController");

// Chat Routes
router.get("/chats", isAdmin, getChat);

module.exports = router;
