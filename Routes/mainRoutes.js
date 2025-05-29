const express = require("express");
const router = express.Router();
router.use(express.json());

//Import mainController Functons and Middlewares
const verifyToken = require("../Middlewares/verifyToken");
const {
  logIn,
  signUp,
  updateUser,
  viewOrders,
  delProfile,
  getOneProd,
  verifyEmail,
  getProducts,
  cancelOrder,
  orderProduct,
  resetPassword,
  forgetPassowrd,
} = require("../Controllers/mainController");

//Routes
router.post("/login", logIn);
router.post("/signup", signUp);
router.get("/product/:id", getOneProd);
router.get("/all-products", getProducts);
router.post("/verify-email", verifyEmail);
router.patch("/forget-password", forgetPassowrd);
router.get("/view-orders", verifyToken, viewOrders);
router.post("/order-product", verifyToken, orderProduct);
router.patch("/update-profile", verifyToken, updateUser);
router.delete("/delete-profile", verifyToken, delProfile);
router.patch("/reset-password", verifyToken, resetPassword);
router.patch("/cancel-order/:id", verifyToken, cancelOrder);

//Export Routes
module.exports = router;
