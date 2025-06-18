const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User-Logins",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const reviews = mongoose.model("Review", reviewSchema);
module.exports = reviews;
