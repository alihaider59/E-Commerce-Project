//Import Modules and Files
const brycpt = require("bcrypt");
const {
  sendEmail,
  hashPassword,
  validateEmail,
  comparePassword,
} = require("../Controllers/mainController");

//Import Models
const Orders = require("../Models/orders");
const Products = require("../Models/products");
const UserLogins = require("../Models/userLogins");
const UserProfiles = require("../Models/userProfiles");
const { trusted } = require("mongoose");

//Mail Variables
let toEmail;
let subject;
let text;

//Create Admin
const createAdmin = async (req, res) => {
  try {
    const { email, password, ...otherData } = req.body;
    const isValid = await validateEmail(email);
    if (!isValid) {
      return res.json({ message: "Email not valid" });
    }
    const isExisting = await UserLogins.findOne({ email });
    if (isExisting) {
      return res.json({ message: "User already Exist" });
    }
    const hashedPass = await hashPassword(password);
    const newAdmin = await UserProfiles.create({ role: "admin", ...otherData });
    const loginData = await UserLogins.create({
      email,
      password: hashedPass,
      profileId: newAdmin._id,
    });
    res.json({ message: "Admin Created" });
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

//Add Product
const addProduct = async (req, res) => {
  try {
    const productDetails = req.body;
    const newProduct = await Products.create(productDetails);
    res.json({ message: "Product Added" });
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

//View Products
const getProducts = async (req, res) => {
  try {
    const allProducts = await Products.find();
    res.json({ message: "All Products", data: allProducts });
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

//Edit or Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) return res.json({ message: "Product not found" });
    const updateFields = {
      ...product._doc,
      ...req.body,
    };
    const updatedProd = await Products.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );
    res.json({ message: "Product Updated" });
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

//Delete Product
const delProduct = async (req, res) => {
  try {
    const delProd = await Products.findByIdAndDelete(req.params.id);
    res.json({ message: "Product Deleted" });
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

//View All Orders
const viewOrders = async (req, res) => {
  try {
    const orders = await Orders.find();
    if (!orders) return res.json({ message: "No any order placed" });
    res.json({ message: "Total Orders", data: orders });
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
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
      return res.json({
        message: "Order Status Updated",
        Status: order.status,
        Mail: mail?.message || "Mail not sent",
      });
    }
    if (order.status === "On the way") {
      text = "Your order is on the way";
      const mail = await sendEmail(user.email, subject, text);
      return res.json({
        message: "Order Status Updated",
        Status: order.status,
        Mail: mail?.message || "Mail not sent",
      });
    }
    if (order.status === "Delivered") {
      text = "Your order is Delivered";
      const mail = await sendEmail(user.email, subject, text);
      return res.json({
        message: "Order Status Updated",
        Status: order.status,
        Mail: mail?.message || "Mail not sent",
      });
    }
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

//Cancel Order
const cancelOrder = async (req, res) => {
  try {
    const { cancelReason } = req.body;
    const order = await Orders.findById(req.params.id);
    const profileId = order.ordered_by;
    const user = await UserLogins.findOne({ profileId });
    if (!order) return res.json({ message: "Order not found" });

    if (["On the way", "Delivered"].includes(order.status))
      return res.json({ message: "You can't cancel this order now" });

    order.status = "Cancelled";
    order.cancelled_by = "admin";
    order.cancelReason = cancelReason || "Cancelled by Admin";
    await order.save();

    text = "Your order cancelled by admin";
    const userMail = await sendEmail(user.email, "Cancel Order", text);
    res.json({
      message: "Order Cancelled by admin",
      userMail: userMail?.message || "Mail not sent",
      Order: order,
    });
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

//Export Functions
module.exports = {
  addProduct,
  viewOrders,
  delProduct,
  getProducts,
  createAdmin,
  cancelOrder,
  updateStatus,
  updateProduct,
};
