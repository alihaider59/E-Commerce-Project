const express = require("express");
const router = express.Router();
router.use(express.json());

//Import Functions and Middlewares
const upload = require("../../Middlewares/upload");
const verifyToken = require("../../Middlewares/verifyToken");
const {
  viewWishlist,
  removeFromWL,
  addToWishlist,
} = require("../../Controllers/mainControllers/wishlistController");

// Wishlist Routes
router.get("/wishlist", verifyToken, viewWishlist);
router.delete("/wishlist/:id", verifyToken, removeFromWL);
router.post("/wishlist", verifyToken, upload.none(), addToWishlist);

module.exports = router;
