const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const isAdmin = require("../Middlewares/adminMiddlewares/isAdmin");
const {
  delOrder,
  delProduct,
  viewOrders,
  addProduct,
  getProducts,
  createAdmin,
  cancelOrder,
  updateStatus,
  updateProduct,
} = require("../Controllers/adminController");

//Routes
router.get("/total-orders", isAdmin, viewOrders);
router.post("/add-product", isAdmin, addProduct);
router.get("/all-products", isAdmin, getProducts);
router.post("/create-admin", isAdmin, createAdmin);
router.delete("/delete-order/:id", isAdmin, delOrder);
router.patch("/cancel-order/:id", isAdmin, cancelOrder);
router.delete("/delete-product/:id", isAdmin, delProduct);
router.patch("/update-product/:id", isAdmin, updateProduct);
router.patch("/update-order-status/:id", isAdmin, updateStatus);

//Export Routes
module.exports = router;
