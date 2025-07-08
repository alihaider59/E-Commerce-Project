const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const upload = require("../../Middlewares/upload");
const isAdmin = require("../../Middlewares/adminMiddlewares/isAdmin");
const {
  delProduct,
  addProduct,
  getProducts,
  updateProduct,
} = require("../../Controllers/adminControllers/productController");

// Product Routes
router.get("/products", isAdmin, getProducts);
router.delete("/products/:id", isAdmin, delProduct);
router.post("/products", isAdmin, upload.array("images"), addProduct);
router.patch("/products/:id", isAdmin, upload.array("images"), updateProduct);

module.exports = router;
