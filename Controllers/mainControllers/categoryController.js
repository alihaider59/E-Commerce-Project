//Import Models
const Categories = require("../../Models/category");

//Get Categories
const getCategories = async (req, res) => {
  try {
    const allCategories = await Categories.find();
    if (!allCategories.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Categories not found", code: 404 });
    }
    res.status(200).json({
      success: true,
      message: "Categories Sent",
      data: allCategories,
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
module.exports = { getCategories };
