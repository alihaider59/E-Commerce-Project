const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const upload = require("../../Middlewares/upload");
const verifyToken = require("../../Middlewares/verifyToken");
const { getCategories } = require("../../Controllers/mainControllers/categoryController");

// Category Routes
router.get("/categories", getCategories);

module.exports = router;
