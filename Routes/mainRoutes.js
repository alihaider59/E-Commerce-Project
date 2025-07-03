const express = require("express");
const router = express.Router();
router.use(express.json());

//Import mainController Functons and Middlewares
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

// // Auth Routes
router.post("/auth/login", logIn);
router.post("/auth/signup", signUp);
router.post("/auth/verify-email", verifyEmail);
router.patch("/auth/forgot-password", forgetPassowrd);
router.patch("/auth/reset-password", verifyToken, resetPassword);

// // User Profile Routes
router.patch("/user/profile", verifyToken, updateUser);
router.delete("/user/profile", verifyToken, delProfile);

// // Product Routes
router.get("/products", getProducts);
router.get("/products/:id", getOneProd);
router.get("/products/category/:id", productsForCategory);

// // Wishlist Routes
router.get("/wishlist", verifyToken, viewWishlist);
router.post("/wishlist", verifyToken, addToWishlist);
router.delete("/wishlist/:id", verifyToken, removeFromWL);

// // Order Routes
router.get("/orders", verifyToken, viewOrders);
router.post("/orders", verifyToken, orderProduct);
router.patch("/orders/:id/cancel", verifyToken, cancelOrder);

// // Feedback Routes
router.get("/feedback/:id", getReviews); // public view
router.post("/feedback", verifyToken, reviews);
router.delete("/feedback/:id", verifyToken, delReviews);
router.patch("/feedback/:id", verifyToken, updateReviews);

// // Category Routes
router.get("/categories", getCategories);

// // Stripe Payment Routes
router.post("/create-payment-intent", verifyToken, paymentIntent);

// // Chat Routes
router.post("/chatbot", verifyToken, aiChatbot);
router.get("/chat/user", verifyToken, getChatUser);
router.delete("/chat/user", verifyToken, delChatUser);
router.get("/chat/room/:roomid", verifyToken, getChatRoom);

// router.post("/login", logIn);
// router.post("/signup", signUp);
// router.get("/product/:id", getOneProd);
// router.get("/feedback/:id", getReviews);
// router.get("/all-products", getProducts);
// router.get("/categories", getCategories);
// router.post("/verify-email", verifyEmail);
// router.post("/feedback", verifyToken, reviews);
// router.patch("/forget-password", forgetPassowrd);
// router.get("/view-orders", verifyToken, viewOrders);
// router.get("/view-wishlist", verifyToken, viewWishlist);
// router.post("/order-product", verifyToken, orderProduct);
// router.patch("/update-profile", verifyToken, updateUser);
// router.delete("/delete-profile", verifyToken, delProfile);
// router.get("/specific-category/:id", productsForCategory);
// router.post("/add-to-wishlist", verifyToken, addToWishlist);
// router.patch("/reset-password", verifyToken, resetPassword);
// router.patch("/cancel-order/:id", verifyToken, cancelOrder);
// router.delete("/delete-feedback/:id", verifyToken, delReviews);
// router.patch("/update-feedback/:id", verifyToken, updateReviews);
// router.delete("/remove-from-wishlist/:id", verifyToken, removeFromWL);

//Export Routes
module.exports = router;
