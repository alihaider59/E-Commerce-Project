const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  ordered_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User-Profiles",
    required: true,
  },
  ordered_products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  shippingAddress: {
    type: String,
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  payment_method: {
    type: String,
    default: "Cash on delivery",
  },
  status: {
    type: String,
    enum: ["Pending", "On the way", "Delivered", "Confirmed", "Cancelled"],
    default: "Pending",
  },
  cancelled_by: {
    type: String,
    default: null,
  },
  cancelReason: {
    type: String,
    default: ""
  },
});

const orders = mongoose.model("Order", ordersSchema);
module.exports = orders;
