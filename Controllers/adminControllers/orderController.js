//Import Models and Utils
const Orders = require("../../Models/orders");
const Products = require("../../Models/products");
const sendEmail = require("../../Utils/sendEmail");
const UserLogins = require("../../Models/userLogins");

//Mail Variables
let toEmail;
let subject;
let text;

//View All Orders
const viewOrders = async (req, res) => {
  try {
    const orders = await Orders.find();
    if (orders.length === 0)
      return res.status(200).json({
        success: true,
        message: "No any order placed",
        data: [],
        code: 200,
      });
    res.status(200).json({
      success: true,
      message: "Total Orders",
      data: orders,
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

//Update Order Status
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Orders.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true, runValidators: true }
    );
    const profileId = order.ordered_by;
    const user = await UserLogins.findOne({ profileId });
    subject = "Products Order";
    if (order.status === "Confirmed") {
      text = "Your order is Confirmed";
      let mail = await sendEmail(user.email, subject, text);
      return res.status(200).json({
        success: true,
        message: "Order Status Updated",
        status: order.status,
        mail: mail?.message || "Mail not sent",
        code: 200,
      });
    }
    if (order.status === "On the way") {
      text = "Your order is on the way";
      const mail = await sendEmail(user.email, subject, text);
      return res.status(200).json({
        success: true,
        message: "Order Status Updated",
        status: order.status,
        mail: mail?.message || "Mail not sent",
        code: 200,
      });
    }
    if (order.status === "Delivered") {
      text = "Your order is Delivered";
      const mail = await sendEmail(user.email, subject, text);
      return res.status(200).json({
        success: true,
        message: "Order Status Updated",
        status: order.status,
        mail: mail?.message || "Mail not sent",
        code: 200,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      code: 500,
    });
  }
};

//Cancel Order
const cancelOrder = async (req, res) => {
  try {
    const { cancelReason } = req.body;
    const order = await Orders.findById(req.params.id);
    const profileId = order.ordered_by;
    const products = order.ordered_products;
    const user = await UserLogins.findOne({ profileId });
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found", code: 404 });

    if (["On the way", "Delivered"].includes(order.status))
      return res.status(403).json({
        success: false,
        message: `You can't cancel this order now, because it is ${order.status}`,
        code: 403,
      });
    if (order.status === "Cancelled")
      return res.status(409).json({
        success: false,
        message: "Your order is already Cancelled",
        code: 409,
      });
    order.status = "Cancelled";
    order.cancelled_by = "admin";
    order.cancelReason = cancelReason || "Cancelled by Admin";
    if (order.status === "Cancelled") {
      for (let prod of products) {
        const quantity = prod.quantity;
        const _id = prod.product_id;
        const prodStock = await Products.findOne({ _id });
        if (prodStock) {
          prodStock.stock += quantity;
          await prodStock.save();
        }
      }
    }
    await order.save();
    text = "Your order cancelled by admin";
    const userMail = await sendEmail(user.email, "Cancel Order", text);
    res.status(200).json({
      success: true,
      message: "Order Cancelled by admin",
      userMail: userMail?.message || "Mail not sent",
      data: order,
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

//Delete Order
const delOrder = async (req, res) => {
  try {
    const order = await Orders.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Order Deleted",
      data: order,
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
  delOrder,
  viewOrders,
  cancelOrder,
  updateStatus,
};
