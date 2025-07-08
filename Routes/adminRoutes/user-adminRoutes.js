const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const upload = require("../../Middlewares/upload");
const isAdmin = require("../../Middlewares/adminMiddlewares/isAdmin");
const { getUsers, createAdmin } = require("../../Controllers/adminControllers/admin-userController");

// User/Admin Routes
router.get("/profiles", isAdmin, getUsers);
router.post("/admin/create", upload.none(), createAdmin);

module.exports = router;
