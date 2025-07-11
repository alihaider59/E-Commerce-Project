const express = require("express");
const router = express.Router();
router.use(express.json());

const chatRoutes = require("./adminRoutes/chatRoutes");
const dealRoutes = require("./adminRoutes/dealRoutes");
const orderRoutes = require("./adminRoutes/orderRoutes");
const productRoutes = require("./adminRoutes/productRoutes");
const userRoutes = require("./adminRoutes/user-adminRoutes");
const paymentRoutes = require("./adminRoutes/paymentRoutes");
const feedbackRoutes = require("./adminRoutes/feedbackRoutes");
const categoryRoutes = require("./adminRoutes/categoryRoutes");

router.use("/", chatRoutes);
router.use("/", userRoutes);
router.use("/", dealRoutes);
router.use("/", orderRoutes);
router.use("/", productRoutes);
router.use("/", paymentRoutes);
router.use("/", feedbackRoutes);
router.use("/", categoryRoutes);

module.exports = router;
