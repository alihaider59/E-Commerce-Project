//Import Models
const Reviews = require("../../Models/reviews");

//Reviews
const reviews = async (req, res) => {
  try {
    const review_by = req.user.profileId;
    const review = await Reviews.create({ review_by, ...req.body });
    res
      .status(201)
      .json({ success: true, message: "Feedback added", code: 201 });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      Error: error.message,
      code: 500,
    });
  }
};

//Update Reviews
const updateReviews = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Reviews.findByIdAndUpdate(
      req.params.id,
      {
        rating,
        comment,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Review Updated",
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

//Delete Reviews
const delReviews = async (req, res) => {
  try {
    const review = await Reviews.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Review Deleted",
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
  reviews,
  getReviews,
  delReviews,
  updateReviews,
}