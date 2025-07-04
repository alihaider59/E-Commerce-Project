const express = require("express");
const router = express.Router();
router.use(express.json());

//Import mainController Functons and Middlewares
const upload = require("../Middlewares/upload");
const verifyToken = require("../Middlewares/verifyToken");
const {
  logIn,
  signUp,
  reviews,
  aiChatbot,
  updateUser,
  delReviews,
  viewOrders,
  delProfile,
  getOneProd,
  getReviews,
  verifyEmail,
  delChatUser,
  getProducts,
  cancelOrder,
  getChatRoom,
  getChatUser,
  viewWishlist,
  removeFromWL,
  orderProduct,
  paymentIntent,
  updateReviews,
  getCategories,
  resetPassword,
  addToWishlist,
  forgetPassowrd,
  productsForCategory,
} = require("../Controllers/mainController");

//Routes

// Auth Routes
router.post("/auth/login", upload.none(), logIn);
router.post("/auth/signup", upload.none(), signUp);
router.post("/auth/verify-email", upload.none(), verifyEmail);
router.patch("/auth/forgot-password", upload.none(), forgetPassowrd);
router.patch("/auth/reset-password", verifyToken, upload.none(), resetPassword);

// User Profile Routes
router.patch("/user/profile", verifyToken, upload.none(), updateUser);
router.delete("/user/profile", verifyToken, delProfile);

// Product Routes
router.get("/products", getProducts);
router.get("/products/:id", getOneProd);
router.get("/products/category/:id", productsForCategory);

// Wishlist Routes
router.get("/wishlist", verifyToken, viewWishlist);
router.post("/wishlist", verifyToken, upload.none(), addToWishlist);
router.delete("/wishlist/:id", verifyToken, removeFromWL);

// Order Routes
router.get("/orders", verifyToken, viewOrders);
router.post("/orders", verifyToken, upload.none(), orderProduct);
router.patch("/orders/:id/cancel", verifyToken, upload.none(), cancelOrder);

// Feedback Routes
router.get("/feedback/:id", getReviews); // public
router.post("/feedback", verifyToken, upload.none(), reviews);
router.delete("/feedback/:id", verifyToken, delReviews);
router.patch("/feedback/:id", verifyToken, upload.none(), updateReviews);

// Category Routes
router.get("/categories", getCategories);

// Stripe Payment Routes
router.post(
  "/create-payment-intent",
  verifyToken,
  upload.none(),
  paymentIntent
);

// Chat Routes
router.post("/chatbot", verifyToken, upload.none(), aiChatbot);
router.get("/chat/user", verifyToken, getChatUser);
router.delete("/chat/user", verifyToken, delChatUser);
router.get("/chat/room/:roomid", verifyToken, getChatRoom);

//Export Routes
module.exports = router;
