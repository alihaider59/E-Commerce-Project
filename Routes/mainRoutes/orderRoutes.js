const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const upload = require("../../Middlewares/upload");
const verifyToken = require("../../Middlewares/verifyToken");
const {
  viewOrders,
  cancelOrder,
  orderProduct,
} = require("../../Controllers/mainControllers/orderController");

// Order Routes
router.get("/orders", verifyToken, viewOrders);
router.post("/orders", verifyToken, upload.none(), orderProduct);
router.patch("/orders/:id/cancel", verifyToken, upload.none(), cancelOrder);

module.exports = router;
