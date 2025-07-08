//Import Models and Utils
const Orders = require("../../Models/orders");
const Products = require("../../Models/products");
const Payments = require("../../Models/payments");
const sendEmail = require("../../Utils/sendEmail");
const UserProfiles = require("../../Models/userProfiles");

//Order Product
const orderProduct = async (req, res) => {
  try {
    const { profileId, email } = req.user;
    let { ordered_products, shippingAddress, stripePaymentId } = req.body;

    if (!ordered_products || !shippingAddress || !stripePaymentId)
      return res.status(400).json({
        success: false,
        message: "Some fields are missing",
        code: 400,
      });

    if (ordered_products && typeof ordered_products === "string") {
      ordered_products = JSON.parse(ordered_products);
    }

    let total_amount = 0;
    for (let item of ordered_products) {
      const product = await Products.findById(item.product_id);
      if (!product)
        return res
          .status(404)
          .json({ success: false, message: "Product not found", code: 404 });
      if (product.stock < item.quantity)
        return res.status(409).json({
          success: false,
          message: `${product.name} is out of stock`,
          code: 409,
        });
      let price;
      if (product.discountedPrice) {
        price = product.discountedPrice;
      } else {
        price = product.price;
      }
      total_amount += price * item.quantity;
      product.stock -= item.quantity;
      await product.save();
    }
    const payment = await Payments.create({
      userId: profileId,
      stripePaymentId,
      amount: total_amount,
    });
    const createOrder = await Orders.create({
      ordered_by: profileId,
      ordered_products,
      shippingAddress,
      total_amount,
      paymentInfo: payment._id,
    });
    if (!createOrder)
      return res.status(500).json({
        success: false,
        message: "Order not placed due to server error",
        code: 500,
      });
    const subject = "Ordered Product";
    const text =
      "Your have ordered some products from E-Commerce. We will inform you in in shortly if your order confirms";
    const text2 =
      "A user has placed an order. Please check the admin dashboard for details.";
    const userMail = await sendEmail(email, subject, text);
    const adminMail = await sendEmail(
      "ali.haider.cp59@gmail.com",
      "New Order Placed",
      text2
    );
    res.status(200).json({
      success: true,
      message: "Order Placed Successfully",
      userMail: userMail?.message || "Mail not sent",
      adminMail: adminMail?.message || "Mail not sent",
      status: createOrder.status,
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

//View Orders
const viewOrders = async (req, res) => {
  try {
    const { profileId } = req.user;
    const orders = await Orders.find({ ordered_by: profileId });
    if (orders.length === 0)
      return res.status(200).json({
        success: true,
        message: "No orders placed yet",
        data: [],
        code: 200,
      });
    res
      .status(200)
      .json({ success: true, message: "View Orders", data: orders, code: 200 });
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
    const { profileId, email } = req.user;
    const { cancelReason } = req.body;
    const order = await Orders.findById(req.params.id);
    if (!order)
      return res.status(404).json({
        success: false,
        message: "Order not found",
        code: 404,
      });
    const products = order.ordered_products;
    const user = await UserProfiles.findOne({ _id: profileId });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
        code: 404,
      });
    if (["On the way", "Delivered"].includes(order.status)) {
      return res.status(403).json({
        success: false,
        message: `You can't cancel this order now, because it is ${order.status}`,
        code: 403,
      });
    }
    if (order.status === "Cancelled")
      return res.status(409).json({
        success: false,
        message: "Your order is already Cancelled",
        code: 409,
      });
    order.status = "Cancelled";
    order.cancelled_by = user.role;
    order.cancelReason = cancelReason || "No reason provided";
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
    const text = "Your order cancelled";
    const userMail = await sendEmail(email, "Cancel Order", text);
    res.status(200).json({
      success: true,
      message: "Order Cancelled",
      mail: userMail?.message || "Mail not sent",
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
  viewOrders,
  cancelOrder,
  orderProduct,
};