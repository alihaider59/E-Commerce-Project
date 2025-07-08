//Import Modules
const Products = require("../../Models/products");

//Add Product
const addProduct = async (req, res) => {
  try {
    let { flashDeal, ...product } = req.body;

    if (req.files && req.files.length > 0) {
      product.images = req.files.map(
        (file) => `/public/images/products/${file.filename}`
      );
    }

    if (flashDeal && typeof flashDeal === "string") {
      try {
        flashDeal = JSON.parse(flashDeal);
      } catch (error) {
        return res.status(400).json({ message: "Invalid flashDeal JSON" });
      }
    }

    const now = new Date();
    let newProduct;

    if (
      flashDeal?.isActive &&
      now >= new Date(flashDeal.startTime) &&
      now <= new Date(flashDeal.endTime)
    ) {
      const discountedPrice =
        product.price - (product.price * flashDeal.discountPercent) / 100;
      newProduct = await Products.create({
        discountedPrice,
        flashDeal,
        ...product,
      });
    } else {
      newProduct = await Products.create({ ...product });
    }

    res.status(201).json({
      success: true,
      message: "Product Added",
      data: newProduct,
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

//View Products
const getProducts = async (req, res) => {
  try {
    const allProducts = await Products.find();
    if (allProducts.length === 0)
      return res.status(200).json({
        success: true,
        message: "Not any product found",
        data: [],
        code: 200,
      });
    res.status(200).json({
      success: true,
      message: "All Products",
      data: allProducts,
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

//Edit or Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found", code: 404 });

    const updateFields = { ...req.body };
    let discountedPrice = product.discountedPrice;

    if (
      product.flashDeal &&
      product.flashDeal.isActive &&
      updateFields.price &&
      product.flashDeal.discountPercent
    ) {
      discountedPrice =
        updateFields.price -
        (updateFields.price * product.flashDeal.discountPercent) / 100;
    }

    if (req.files && req.files.length > 0) {
      updateFields.images = req.files.map(
        (file) => `/public/images/products/${file.filename}`
      );
    }

    const updatedProd = await Products.findByIdAndUpdate(
      req.params.id,
      { discountedPrice, ...updateFields },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Product Updated",
      data: updatedProd,
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

//Delete Product
const delProduct = async (req, res) => {
  try {
    const delProd = await Products.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product Deleted",
      data: delProd,
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
  delProduct,
  addProduct,
  getProducts,
  updateProduct,
};
