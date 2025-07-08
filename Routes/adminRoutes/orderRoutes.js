const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const upload = require("../../Middlewares/upload");
const isAdmin = require("../../Middlewares/adminMiddlewares/isAdmin");
const {
  delOrder,
  viewOrders,
  cancelOrder,
  updateStatus,
} = require("../../Controllers/adminControllers/orderController");

// Order Routes
router.get("/orders", isAdmin, viewOrders);
router.delete("/orders/:id", isAdmin, delOrder);
router.patch("/orders/:id/cancel", isAdmin, upload.none(), cancelOrder);
router.patch("/orders/:id/status", isAdmin, upload.none(), updateStatus);

module.exports = router;
