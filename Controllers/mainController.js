const dbConnection = require("../DB/db");
const secret = "abc123";
dbConnection();

//Import Modules
const jwt = require("jsonwebtoken");

//Import Functions
const sendEmail = require("../Utils/sendEmail");
const validateEmail = require("../Utils/validateEmail");
const { hashPassword, comparePassword } = require("../Utils/hashPassword");

//Import Models
const Orders = require("../Models/orders");
const Products = require("../Models/products");
const UserLogins = require("../Models/userLogins");
const UserProfiles = require("../Models/userProfiles");

//SignUp
const signUp = async (req, res) => {
  try {
    const { email, password, ...newUser } = req.body;

    const isValid = validateEmail(email);
    if (!isValid) {
      return res.json({ message: "Email is not valid" });
    }

    const hashedPass = await hashPassword(password);
    const newSignUp = await UserProfiles.create(newUser);
    const newLogin = await UserLogins.create({
      email,
      password: hashedPass,
      profileId: newSignUp._id,
    });
    res.json({ message: "Signed Up Successfully" });
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

//Login
const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserLogins.findOne({ email });
    if (!user) {
      return res.json({ message: "User does not exist" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Passowrd not match" });
    } else {
      const payload = {
        email: user.email,
        profileId: user.profileId,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "1h" });
      res.json({ message: "Login Successfully", token });
    }
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

//Update Profile
const updateUser = async (req, res) => {
  try {
    const { profileId } = req.user;
    const userProf = await UserProfiles.findOne({ _id: profileId });
    if (!userProf) return res.json({ message: "Profile not found" });
    const updateFields = {
      ...userProf._doc,
      ...req.body,
    };
    const updatedProf = await UserProfiles.findOneAndUpdate(
      { _id: profileId },
      updateFields,
      { new: true }
    );
    res.json({ message: "Profile Updated" });
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

//Delete Profile
const delProfile = async (req, res) => {
  try {
    const { profileId } = req.user;
    const profile = await UserProfiles.findOneAndDelete({ _id: profileId });
    const loginData = await UserLogins.findOneAndDelete({ profileId });
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

//Verify Email
const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const isMatch = await UserLogins.findOne({ email });
    if (!isMatch) {
      return res.json({ message: "Email not exist" });
    }
    const toEmail = "alihaiderjoyia59@gmail.com";
    const subject = "Reset Password";
    const text = "Do you want to reset you password?";
    const isSent = await sendEmail(toEmail, subject, text);
    res.json({
      success: true,
      message: "Email Verified",
      Mail: isSent?.message || "Mail not sent",
    });
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

//Forget Passowrd
const forgetPassowrd = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPass = await hashPassword(password);
    const updatePass = await UserLogins.findOneAndUpdate(
      { email },
      { $set: { password: hashedPass } },
      { new: true }
    );
    res.json({ message: "Password Updated" });
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

//Reset Password
const resetPassword = async (req, res) => {
  try {
    const { profileId } = req.user;
    const { oldPassword, newPassword } = req.body;
    const user = await UserLogins.findOne({ profileId });
    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) {
      return res.json({ message: "Old password not match" });
    }
    const hashedPass = await hashPassword(newPassword);
    const newPass = await UserLogins.findOneAndUpdate(
      { profileId },
      {
        $set: {
          password: hashedPass,
        },
      },
      { new: true }
    );
    res.json({ message: "Password Changed" });
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

//View All Products
const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = category;
    }

    const allProducts = await Products.find(query);
    res.json({ message: "All Products", data: allProducts });
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

//View One Product
const getOneProd = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.json({ message: "View Product", data: product });
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

//Order Product
const orderProduct = async (req, res) => {
  try {
    const { profileId, email } = req.user;
    const { ordered_products, shippingAddress } = req.body;
    let total_amount = 0;
    for (let item of ordered_products) {
      const product = await Products.findById(item.product_id);
      if (!product) return res.json({ message: "Product not found" });
      if (product.stock < item.quantity)
        return res.json({ message: `${product.name} is out of stock` });

      total_amount += product.price * item.quantity;
      product.stock -= item.quantity;
      await product.save();
    }
    const createOrder = await Orders.create({
      ordered_by: profileId,
      ordered_products,
      shippingAddress,
      total_amount,
    });
    if (!createOrder) return res.json({ message: "Order not placed!" });
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
    res.json({
      success: true,
      message: "Order Placed Successfully",
      userMail: userMail?.message || "Mail not sent",
      adminMail: adminMail?.message || "Mail not sent",
      Status: createOrder.status,
    });
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

//View Orders
const viewOrders = async (req, res) => {
  try {
    const { profileId } = req.user;
    const orders = await Orders.findOne({ ordered_by: profileId });
    if (!orders) return res.json({ message: "No any order placed" });
    res.json({ message: "View Orders", data: orders });
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

//Cancel Order
const cancelOrder = async (req, res) => {
  try {
    const { profileId, email } = req.user;
    const { cancelReason } = req.body;
    const order = await Orders.findById(req.params.id);
    const products = order.ordered_products;
    const user = await UserProfiles.findOne({ _id: profileId });
    if (!order) return res.json({ message: "Order not found" });

    if (["On the way", "Delivered"].includes(order.status))
      return res.json({
        message: `You can't cancel this order now, because it is ${order.status}`,
      });
    if (order.status === "Cancelled")
      return res.json({ message: "Your order is already Cancelled" });
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
    res.json({
      message: "Order Cancelled",
      userMail: userMail?.message || "Mail not sent",
      Order: order,
    });
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

//Export Functions
module.exports = {
  logIn,
  signUp,
  viewOrders,
  delProfile,
  updateUser,
  getOneProd,
  getProducts,
  verifyEmail,
  cancelOrder,
  orderProduct,
  hashPassword,
  validateEmail,
  resetPassword,
  forgetPassowrd,
  comparePassword,
};
