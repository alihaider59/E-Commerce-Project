const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const upload = require("../Middlewares/upload");
const isAdmin = require("../Middlewares/adminMiddlewares/isAdmin");
const {
  getChat,
  delOrder,
  delCtgry,
  addDeals,
  getUsers,
  getReviews,
  delReviews,
  delProduct,
  viewOrders,
  addProduct,
  getPayments,
  getProducts,
  createCtgry,
  createAdmin,
  globalDeals,
  cancelOrder,
  updateCtgry,
  updateStatus,
  getCategories,
  updateProduct,
  getUserPayment,
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
router.post("/products", isAdmin, upload.array("images"), addProduct);
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

// // Payment Routes
router.get("/payments", isAdmin, getPayments);
router.get("/user/payments/:id", isAdmin, getUserPayment);

// // Chat Routes
router.get("/chats", isAdmin, getChat);

//Export Routes
module.exports = router;
