const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const upload = require("../../Middlewares/upload");
const verifyToken = require("../../Middlewares/verifyToken");
const {
  logIn,
  signUp,
  verifyEmail,
  resetPassword,
  forgetPassowrd,
} = require("../../Controllers/mainControllers/authController");

// Auth Routes
router.post("/auth/login", upload.none(), logIn);
router.post("/auth/signup", upload.none(), signUp);
router.post("/auth/verify-email", upload.none(), verifyEmail);
router.patch("/auth/forgot-password", upload.none(), forgetPassowrd);
router.patch("/auth/reset-password", verifyToken, upload.none(), resetPassword);

module.exports = router;
