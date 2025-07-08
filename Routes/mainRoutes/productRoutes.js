const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const upload = require("../../Middlewares/upload");
const verifyToken = require("../../Middlewares/verifyToken");
const {
  getOneProd,
  getProducts,
  productsForCategory,
} = require("../../Controllers/mainControllers/productController");

// Product Routes
router.get("/products", getProducts);
router.get("/products/:id", getOneProd);
router.get("/products/category/:id", productsForCategory);

module.exports = router;
