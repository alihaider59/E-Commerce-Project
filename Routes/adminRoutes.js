const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const isAdmin = require("../Middlewares/adminMiddlewares/isAdmin");
const {
  delOrder,
  delCtgry,
  addDeals,
  getReviews,
  delReviews,
  delProduct,
  viewOrders,
  addProduct,
  getProducts,
  createCtgry,
  createAdmin,
  globalDeals,
  cancelOrder,
  updateCtgry,
  updateStatus,
  getCategories,
  updateProduct,
  delGlobalDeals,
  updateGlobalDeals
} = require("../Controllers/adminController");

//Routes
router.post("/create-admin", createAdmin);
router.get("/feedback/:id", isAdmin, getReviews);
router.get("/total-orders", isAdmin, viewOrders);
router.post("/add-product", isAdmin, addProduct);
router.get("/categories", isAdmin, getCategories);
router.get("/all-products", isAdmin, getProducts);
router.patch("/add-discount/:id", isAdmin, addDeals);
router.post("/add-global-deal", isAdmin, globalDeals);
router.post("/create-category", isAdmin, createCtgry);
router.delete("/delete-order/:id", isAdmin, delOrder);
router.patch("/cancel-order/:id", isAdmin, cancelOrder);
router.delete("/delete-category/:id", isAdmin, delCtgry);
router.delete("/delete-product/:id", isAdmin, delProduct);
router.delete("/delete-feedback/:id", isAdmin, delReviews);
router.patch("/update-category/:id", isAdmin, updateCtgry);
router.delete("/delete-deal/:id", isAdmin, delGlobalDeals);
router.patch("/update-product/:id", isAdmin, updateProduct);
router.patch("/update-deal/:id", isAdmin, updateGlobalDeals);
router.patch("/update-order-status/:id", isAdmin, updateStatus);

//Export Routes
module.exports = router;
