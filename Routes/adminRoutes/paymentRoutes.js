const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const upload = require("../../Middlewares/upload");
const isAdmin = require("../../Middlewares/adminMiddlewares/isAdmin");
const {
  getPayments,
  getUserPayment,
} = require("../../Controllers/adminControllers/paymentsController");

// Payment Routes
router.get("/payments", isAdmin, getPayments);
router.get("/user/payments/:id", isAdmin, getUserPayment);

module.exports = router;
