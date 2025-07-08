//Import Models and Utils
const Products = require("../../Models/products")
const addGlobalDeal = require("../../Utils/addDeal");
const GlobalDeals = require("../../Models/globalDeals")


//View All Products
const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = category;
    }

    const allProducts = await Products.find(query);
    if (allProducts.length === 0)
      return res.status(200).json({
        success: true,
        message: "Product not found",
        data: [],
        code: 200,
      });

    const globalDeal = await GlobalDeals.findOne({ isActive: true });
    const updatedProducts = allProducts.map((product) => {
      const updatedProduct = product.toObject();
      addGlobalDeal(updatedProduct, globalDeal);
      return updatedProduct;
    });
    res.status(200).json({
      success: true,
      message: "All Products",
      data: updatedProducts,
      code: 200,
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

//View One Product
const getOneProd = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, messages: "Product not found", code: 404 });
    res.status(200).json({
      success: true,
      message: "View Product",
      data: product,
      code: 200,
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

//Products for Specific Category
const productsForCategory = async (req, res) => {
  try {
    const products = await Products.find({ category: req.params.id });
    if (products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No products available",
        code: 200,
      });
    }
    res.status(200).json({
      success: true,
      message: "Available Products for this category",
      data: products,
      code: 200,
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

//Export Functions
module.exports = {
  getProducts,
  getOneProd,
  productsForCategory,
}