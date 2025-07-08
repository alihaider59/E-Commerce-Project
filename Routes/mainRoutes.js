const express = require("express");
const router = express.Router();
router.use(express.json());

const authRoutes = require("./mainRoutes/authRoutes");
const categoryRoutes = require("./mainRoutes/categoryRoutes");
const productRoutes = require("./mainRoutes/productRoutes");
const orderRoutes = require("./mainRoutes/orderRoutes");
const wishlistRoutes = require("./mainRoutes/wishlistRoutes");
const stripeRoutes = require("./mainRoutes/stripeRoutes");
const chatRoutes = require("./adminRoutes/chatRoutes");
const feedbackRoutes = require("./mainRoutes/feedbackRoutes");
const profileRoutes = require("./mainRoutes/profileRoutes");

router.use("/", authRoutes);
router.use("/", categoryRoutes);
router.use("/", productRoutes);
router.use("/", orderRoutes);
router.use("/", wishlistRoutes);
router.use("/", stripeRoutes);
router.use("/", chatRoutes);
router.use("/", feedbackRoutes);
router.use("/", profileRoutes);

module.exports = router;
