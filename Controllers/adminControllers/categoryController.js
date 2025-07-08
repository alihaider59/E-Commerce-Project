//Import Models
const Categories = require("../../Models/category");

//Create Category
const createCtgry = async (req, res) => {
  try {
    const category = req.body;

    if (req.file) {
      category.icon = `/public/images/categories/${req.file.filename}`;
    }

    const newCtgry = await Categories.create(category);
    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: newCtgry,
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

//Get Categories
const getCategories = async (req, res) => {
  try {
    const allCategories = await Categories.find();
    if (allCategories.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Categories not found",
        data: [],
        code: 200,
      });
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

//Update Category
const updateCtgry = async (req, res) => {
  try {
    const ctgryFields = req.body;

    if (req.file) {
      ctgryFields.icon = `/public/images/categories/${req.file.filename}`;
    }

    const category = await Categories.findByIdAndUpdate(
      req.params.id,
      {
        $set: ctgryFields,
      },
      { new: true }
    );

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found", code: 404 });
    }

    res.status(200).json({
      success: true,
      message: "Category Updated",
      data: category,
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

//Delete Category
const delCtgry = async (req, res) => {
  try {
    const category = await Categories.findByIdAndDelete(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found", code: 404 });
    }

    res.status(200).json({
      success: true,
      message: "Category Deleted",
      data: category,
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
  delCtgry,
  createCtgry,
  updateCtgry,
  getCategories,
};
