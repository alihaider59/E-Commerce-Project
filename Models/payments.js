const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "User-Profiles",
    required: true,
  },
  stripePaymentId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "usd"
  },
  paymentStatus: {
    type: String,
    default: "succeeded"
  },
});

const payments = mongoose.model("Payment", paymentSchema);
module.exports = payments;