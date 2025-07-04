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

router.post("/products", isAdmin, upload.array("images"), addProduct);
router.patch("/products/:id", upload.array("images"), isAdmin, updateProduct);
router.post("/categories", upload.array("images"), isAdmin, createCtgry);
router.patch("/categories/:id", upload.array("images"), isAdmin, updateCtgry);

// ✅ GET Routes (no body needed)
router.get("/profiles", isAdmin, getUsers);
router.get("/products", isAdmin, getProducts);
router.get("/categories", isAdmin, getCategories);
router.get("/orders", isAdmin, viewOrders);
router.get("/feedback/:id", isAdmin, getReviews);
router.get("/payments", isAdmin, getPayments);
router.get("/user/payments/:id", isAdmin, getUserPayment);
router.get("/chats", isAdmin, getChat);

// ✅ POST Routes (no images, use upload.none())
router.post("/admin/create", upload.none(), createAdmin);
router.post("/deals/global", isAdmin, upload.none(), globalDeals);

// ✅ DELETE Routes (no body, so no need for upload.none())
router.delete("/products/:id", isAdmin, delProduct);
router.delete("/categories/:id", isAdmin, delCtgry);
router.delete("/orders/:id", isAdmin, delOrder);
router.delete("/deals/global/:id", isAdmin, delGlobalDeals);
router.delete("/feedback/:id", isAdmin, delReviews);

// ✅ PATCH Routes (need body, use upload.none())
router.patch("/orders/:id/cancel", isAdmin, upload.none(), cancelOrder);
router.patch("/orders/:id/status", isAdmin, upload.none(), updateStatus);
router.patch("/deals/global/:id", isAdmin, upload.none(), updateGlobalDeals);
router.patch("/deals/product/:id", isAdmin, upload.none(), addDeals);

//Export Routes
module.exports = router;
