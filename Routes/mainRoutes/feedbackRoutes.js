const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const upload = require("../../Middlewares/upload");
const verifyToken = require("../../Middlewares/verifyToken");
const {
  reviews,
  delReviews,
  getReviews,
  updateReviews,
} = require("../../Controllers/mainControllers/reviewController");

// Feedback Routes
router.get("/feedback/:id", getReviews);
router.delete("/feedback/:id", verifyToken, delReviews);
router.post("/feedback", verifyToken, upload.none(), reviews);
router.patch("/feedback/:id", verifyToken, upload.none(), updateReviews);

module.exports = router;
