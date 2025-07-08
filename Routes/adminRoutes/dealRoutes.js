const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const upload = require("../../Middlewares/upload");
const isAdmin = require("../../Middlewares/adminMiddlewares/isAdmin");
const {
  addDeals,
  globalDeals,
  delGlobalDeals,
  updateGlobalDeals,
} = require("../../Controllers/adminControllers/dealsController");

// Deals Routes
router.delete("/deals/global/:id", isAdmin, delGlobalDeals);
router.post("/deals/global", isAdmin, upload.none(), globalDeals);
router.patch("/deals/product/:id", isAdmin, upload.none(), addDeals);
router.patch("/deals/global/:id", isAdmin, upload.none(), updateGlobalDeals);

module.exports = router;
