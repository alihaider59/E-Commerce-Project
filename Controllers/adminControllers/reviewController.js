//Import Models
const Reviews = require("../../Models/reviews");

//Delete Reviews
const delReviews = async (req, res) => {
  try {
    const review = await Reviews.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Review deleted by admin",
      data: review,
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

//Get Reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find({ product: req.params.id });
    res
      .status(200)
      .json({ success: true, message: "Reviews", data: reviews, code: 200 });
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
  delReviews,
  getReviews,
};
