//Import Models
const Products = require("../../Models/products");
const GlobalDeals = require("../../Models/globalDeals");

//Add / Remove / Edit Flash Deals
const addDeals = async (req, res) => {
  try {
    const { discountPercent, flashDeal } = req.body;
    if (
      [flashDeal?.discountPercent, discountPercent].some(
        (val) => val < 0 || val > 100
      )
    )
      return res.status(400).json({
        success: false,
        message: "Invalid discount percentage",
        code: 400,
      });
    if (
      discountPercent === 0 ||
      flashDeal.discountPercent === 0 ||
      !flashDeal.isActive
    ) {
      const product = await Products.findByIdAndUpdate(
        req.params.id,
        {
          $unset: { discountedPrice: "", flashDeal },
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Discount Removed",
        data: product,
        code: 200,
      });
    }
    const product = await Products.findById(req.params.id);
    const price = product.price;
    const discount = (price * flashDeal.discountPercent) / 100;
    const discountedPrice = price - discount;
    const discountedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      { flashDeal, discountedPrice },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Discount Added",
      data: discountedProduct,
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

//Global Deals
const globalDeals = async (req, res) => {
  try {
    const dealData = req.body;

    if (dealData.categories && typeof dealData.categories === "string") {
      dealData.categories = JSON.parse(dealData.categories);
    }

    if (dealData.startTime && typeof dealData.startTime === "string") {
      dealData.startTime = JSON.parse(dealData.startTime);
    }

    if (dealData.endTime && typeof dealData.endTime === "string") {
      dealData.endTime = JSON.parse(dealData.endTime);
    }

    const newDeal = await GlobalDeals.create(dealData);
    res.status(201).json({
      success: true,
      message: "Global deal created",
      data: newDeal,
      code: 201,
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

//Update Global Deals
const updateGlobalDeals = async (req, res) => {
  try {
    const dealData = req.body;
    const deal = await GlobalDeals.findByIdAndUpdate(
      req.params.id,
      { $set: dealData },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "Deal updated", data: deal, code: 200 });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      Error: error.message,
      code: 500,
    });
  }
};

//Delete Global Deals
const delGlobalDeals = async (req, res) => {
  try {
    const deal = await GlobalDeals.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Deal deleted", data: deal, code: 200 });
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
  addDeals,
  globalDeals,
  delGlobalDeals,
  updateGlobalDeals,
};
