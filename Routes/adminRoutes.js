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

router.use("/admin", chatRoutes);
router.use("/admin", userRoutes);
router.use("/admin", dealRoutes);
router.use("/admin", orderRoutes);
router.use("/admin", productRoutes);
router.use("/admin", paymentRoutes);
router.use("/admin", feedbackRoutes);
router.use("/admin", categoryRoutes);

module.exports = router;
