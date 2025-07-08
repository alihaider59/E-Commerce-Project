//Import Models
const Wishlists = require("../../Models/wishlist");

//Add Product to Wishlist
const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.profileId;
    const { productId } = req.body;
    const wishlist = await Wishlists.create({ userId, productId });

    res.status(201).json({
      success: true,
      message: "Product added to wishlist",
      data: wishlist,
      code: 201,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      code: 500,
    });
  }
};

//View Wishlist
const viewWishlist = async (req, res) => {
  try {
    const userId = req.user.profileId;
    const wishlist = await Wishlists.find({ userId });
    if (wishlist.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No product in your wishlist",
        code: 200,
      });
    }
    res.status(200).json({
      success: true,
      message: "Your wishlist",
      data: wishlist,
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      Error: error.message,
      code: 500,
    });
  }
};

//Remove Product from Wishlist
const removeFromWL = async (req, res) => {
  try {
    const wishlist = await Wishlists.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product removed successfully",
      data: wishlist,
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      Error: error.message,
      code: 500,
    });
  }
};

//Export Functions
module.exports = {
  removeFromWL,
  viewWishlist,
  addToWishlist,
};
