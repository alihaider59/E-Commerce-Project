const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const upload = require("../../Middlewares/upload");
const verifyToken = require("../../Middlewares/verifyToken");
const { paymentIntent } = require("../../Controllers/mainControllers/paymentController");

// Stripe Payment Routes
router.post(
  "/create-payment-intent",
  verifyToken,
  upload.none(),
  paymentIntent
);

module.exports = router;
