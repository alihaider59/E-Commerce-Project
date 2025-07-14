const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const upload = require("../../Middlewares/upload");
const verifyToken = require("../../Middlewares/verifyToken");
const isAdmin = require("../../Middlewares/adminMiddlewares/isAdmin");
const isSuperAdmin = require("../../Middlewares/adminMiddlewares/isSuperAdmin");
const {
  getUsers,
  createAdmin,
} = require("../../Controllers/adminControllers/admin-userController");

// User/Admin Routes
router.get("/profiles", isAdmin, getUsers);
router.post("/admin/create", verifyToken, isSuperAdmin, upload.none(), createAdmin);

module.exports = router;
