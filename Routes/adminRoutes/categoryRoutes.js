const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const upload = require("../../Middlewares/upload");
const isAdmin = require("../../Middlewares/adminMiddlewares/isAdmin");
const {
  delCtgry,
  createCtgry,
  updateCtgry,
  getCategories,
} = require("../../Controllers/adminControllers/categoryController");

// Category Routes
router.get("/categories", isAdmin, getCategories);
router.delete("/categories/:id", isAdmin, delCtgry);
router.post("/categories", isAdmin, upload.single("icon"), createCtgry);
router.patch("/categories/:id", isAdmin, upload.single("icon"), updateCtgry);

module.exports = router;
