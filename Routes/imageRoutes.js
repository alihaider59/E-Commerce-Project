const express = require("express");
const router = express.Router();
router.use(express.json());

const isAdmin = require("../Middlewares/adminMiddlewares/isAdmin");
const {
  addProduct,
  createCtgry,
  updateProduct,
  updateCtgry,
} = require("../Controllers/adminController");

// // Product Routes
router.post("/products", isAdmin, addProduct);
router.patch("/products/:id", isAdmin, updateProduct);

// // Category Routes
router.post("/categories", isAdmin, createCtgry);
router.patch("/categories/:id", isAdmin, updateCtgry);


module.exports = router