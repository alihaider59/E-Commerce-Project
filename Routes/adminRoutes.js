const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const isAdmin = require("../Middlewares/adminMiddlewares/isAdmin");
const {
  delOrder,
  delCtgry,
  addDeals,
  getUsers,
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
  updateGlobalDeals,
} = require("../Controllers/adminController");

//Routes

// // User Profiles Routes
router.get("/profiles", isAdmin, getUsers);

// // Admin Routes
router.post("/admin/create", createAdmin);

// // Product Routes
router.get("/products", isAdmin, getProducts);
router.post("/products", isAdmin, addProduct);
router.delete("/products/:id", isAdmin, delProduct);
router.patch("/products/:id", isAdmin, updateProduct);

// // Category Routes
router.post("/categories", isAdmin, createCtgry);
router.get("/categories", isAdmin, getCategories);
router.delete("/categories/:id", isAdmin, delCtgry);
router.patch("/categories/:id", isAdmin, updateCtgry);

// // Order Routes
router.get("/orders", isAdmin, viewOrders);
router.delete("/orders/:id", isAdmin, delOrder);
router.patch("/orders/:id/cancel", isAdmin, cancelOrder);
router.patch("/orders/:id/status", isAdmin, updateStatus);

// // Deal Routes
router.post("/deals/global", isAdmin, globalDeals);
router.delete("/deals/global/:id", isAdmin, delGlobalDeals);
router.patch("/deals/global/:id", isAdmin, updateGlobalDeals);

router.patch("/deals/product/:id", isAdmin, addDeals); // per-product deal

// // Feedback Routes
router.get("/feedback/:id", isAdmin, getReviews);
router.delete("/feedback/:id", isAdmin, delReviews);

// router.post("/create-admin", createAdmin);
// router.get("/feedback/:id", isAdmin, getReviews);
// router.get("/total-orders", isAdmin, viewOrders);
// router.post("/add-product", isAdmin, addProduct);
// router.get("/categories", isAdmin, getCategories);
// router.get("/all-products", isAdmin, getProducts);
// router.patch("/add-discount/:id", isAdmin, addDeals);
// router.post("/add-global-deal", isAdmin, globalDeals);
// router.post("/create-category", isAdmin, createCtgry);
// router.delete("/delete-order/:id", isAdmin, delOrder);
// router.patch("/cancel-order/:id", isAdmin, cancelOrder);
// router.delete("/delete-category/:id", isAdmin, delCtgry);
// router.delete("/delete-product/:id", isAdmin, delProduct);
// router.delete("/delete-feedback/:id", isAdmin, delReviews);
// router.patch("/update-category/:id", isAdmin, updateCtgry);
// router.delete("/delete-deal/:id", isAdmin, delGlobalDeals);
// router.patch("/update-product/:id", isAdmin, updateProduct);
// router.patch("/update-deal/:id", isAdmin, updateGlobalDeals);
// router.patch("/update-order-status/:id", isAdmin, updateStatus);

//Export Routes
module.exports = router;
