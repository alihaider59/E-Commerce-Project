const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  stock: {
    type: Number,
    default: 1,
    required: true,
  },
  discountedPrice: {
    type: Number,
  },
  flashDeal: {
    isActive: Boolean,
    discountPercent: Number,
    startTime: Date,
    endTime: Date,
  },
  images: [{ type: String, required: true }],
});

const products = mongoose.model("Product", productSchema);
module.exports = products;
