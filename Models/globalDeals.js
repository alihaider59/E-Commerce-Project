const mongoose = require("mongoose");

const globalDealsSchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
    default: false,
    required: true,
  },
  discountPercent: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  applyTo: {
    type: String,
    enum: ["all", "categories"],
    required: true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ],
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

const globalDeals = mongoose.model("GlobalDiscount", globalDealsSchema);
module.exports = globalDeals;
