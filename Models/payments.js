const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "User-Profiles",
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  paymentIntentId: {
    type: String,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
  },
  paymentStatus: {
    type: String,
  },
});

const payments = mongoose.model("Payment", paymentSchema);
module.exports = payments;