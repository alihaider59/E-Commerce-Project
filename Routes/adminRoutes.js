const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const isAdmin = require("../Middlewares/adminMiddlewares/isAdmin");
const {
  delOrder,
  delCtgry,
  getReviews,
  delReviews,
  delProduct,
  viewOrders,
  addProduct,
  getProducts,
  createCtgry,
  createAdmin,
  cancelOrder,
  updateCtgry,
  updateStatus,
  getCategories,
  updateProduct,
} = require("../Controllers/adminController");

//Routes
router.post("/create-admin", createAdmin);
router.get("/feedback/:id", isAdmin, getReviews);
router.get("/total-orders", isAdmin, viewOrders);
router.post("/add-product", isAdmin, addProduct);
router.get("/categories", isAdmin, getCategories);
router.get("/all-products", isAdmin, getProducts);
router.post("/create-category", isAdmin, createCtgry);
router.delete("/delete-order/:id", isAdmin, delOrder);
router.patch("/cancel-order/:id", isAdmin, cancelOrder);
router.delete("/delete-category/:id", isAdmin, delCtgry);
router.delete("/delete-product/:id", isAdmin, delProduct);
router.delete("/delete-feedback/:id", isAdmin, delReviews);
router.patch("/update-category/:id", isAdmin, updateCtgry);
router.patch("/update-product/:id", isAdmin, updateProduct);
router.patch("/update-order-status/:id", isAdmin, updateStatus);

//Export Routes
module.exports = router;
