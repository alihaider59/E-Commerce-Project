const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const upload = require("../../Middlewares/upload");
const isAdmin = require("../../Middlewares/adminMiddlewares/isAdmin");
const { getReviews, delReviews } = require("../../Controllers/adminControllers/reviewController");

// Feedback/Review Routes
router.get("/feedback/:id", isAdmin, getReviews);
router.delete("/feedback/:id", isAdmin, delReviews);

module.exports = router;
