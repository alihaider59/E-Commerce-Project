const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const upload = require("../../Middlewares/upload");
const verifyToken = require("../../Middlewares/verifyToken");
const {
  delProfile,
  updateUser,
  viewProfile,
} = require("../../Controllers/mainControllers/authController");

// User Profile Routes
router.get("/user/profile", verifyToken, viewProfile);
router.delete("/user/profile", verifyToken, delProfile);
router.patch("/user/profile", verifyToken, upload.none(), updateUser);

module.exports = router;
