const express = require("express");
const router = express.Router();
router.use(express.json());

//Import mainController Functons and Middlewares
const verifyToken = require("../Middlewares/verifyToken");
const {
  logIn,
  signUp,
  reviews,
  updateUser,
  delReviews,
  viewOrders,
  delProfile,
  getOneProd,
  getReviews,
  verifyEmail,
  getProducts,
  cancelOrder,
  viewWishlist,
  removeFromWL,
  orderProduct,
  updateReviews,
  getCategories,
  resetPassword,
  addToWishlist,
  forgetPassowrd,
  productsForCategory,
} = require("../Controllers/mainController");

//Routes
router.post("/login", logIn);
router.post("/signup", signUp);
router.get("/product/:id", getOneProd);
router.get("/feedback/:id", getReviews);
router.get("/all-products", getProducts);
router.get("/categories", getCategories);
router.post("/verify-email", verifyEmail);
router.post("/feedback", verifyToken, reviews);
router.patch("/forget-password", forgetPassowrd);
router.get("/view-orders", verifyToken, viewOrders);
router.get("/view-wishlist", verifyToken, viewWishlist);
router.post("/order-product", verifyToken, orderProduct);
router.patch("/update-profile", verifyToken, updateUser);
router.delete("/delete-profile", verifyToken, delProfile);
router.get("/specific-category/:id", productsForCategory);
router.post("/add-to-wishlist", verifyToken, addToWishlist);
router.patch("/reset-password", verifyToken, resetPassword);
router.patch("/cancel-order/:id", verifyToken, cancelOrder);
router.delete("/delete-feedback/:id", verifyToken, delReviews);
router.patch("/update-feedback/:id", verifyToken, updateReviews);
router.delete("/remove-from-wishlist/:id", verifyToken, removeFromWL);

//Export Routes
module.exports = router;
