const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const upload = require("../../Middlewares/upload");
const {
  refreshToken,
} = require("../../Controllers/mainControllers/refreshTokenController");

// Chat Routes
router.post("/refresh-token", upload.none(), refreshToken);

module.exports = router;
