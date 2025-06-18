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
const Reviews = require("../Models/reviews");
const Products = require("../Models/products");
const Wishlists = require("../Models/wishlist");
const Categories = require("../Models/category");
const UserLogins = require("../Models/userLogins");
const UserProfiles = require("../Models/userProfiles");

//SignUp
const signUp = async (req, res) => {
  try {
    const { email, password, ...newUser } = req.body;

    const isValid = validateEmail(email);
    if (!isValid) {
      return res
        .status(400)
        .json({ success: false, message: "Email is not valid", code: 400 });
    }

    const hashedPass = await hashPassword(password);
    const newSignUp = await UserProfiles.create(newUser);
    const newLogin = await UserLogins.create({
      email,
      password: hashedPass,
      profileId: newSignUp._id,
    });
    res
      .status(201)
      .json({ success: true, message: "Signed Up Successfully", code: 201 });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      code: 500,
    });
  }
};

//Login
const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserLogins.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist", code: 404 });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Passowrd not match", code: 401 });
    } else {
      const payload = {
        email: user.email,
        profileId: user.profileId,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "1d" });
      res.status(200).json({
        success: true,
        message: "Login Successfully",
        data: {
          token: token,
        },
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

//Update Profile
const updateUser = async (req, res) => {
  try {
    const { profileId } = req.user;
    const userProf = await UserProfiles.findOne({ _id: profileId });
    if (!userProf)
      return res
        .status(404)
        .json({ success: false, message: "Profile not found", code: 404 });
    const updateFields = {
      ...userProf._doc,
      ...req.body,
    };
    const updatedProf = await UserProfiles.findOneAndUpdate(
      { _id: profileId },
      updateFields,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Profile Updated",
      data: updatedProf,
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

//Delete Profile
const delProfile = async (req, res) => {
  try {
    const { profileId } = req.user;
    const profile = await UserProfiles.findOneAndDelete({ _id: profileId });
    const loginData = await UserLogins.findOneAndDelete({ profileId });
    res
      .status(200)
      .json({ success: true, message: "Deleted Successfully", code: 200 });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      code: 500,
    });
  }
};

//Verify Email
const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const isMatch = await UserLogins.findOne({ email });
    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, message: "Email not exist", code: 404 });
    }
    const toEmail = "alihaiderjoyia59@gmail.com";
    const subject = "Reset Password";
    const text = "Do you want to reset you password?";
    const isSent = await sendEmail(toEmail, subject, text);
    res.status(200).json({
      success: true,
      message: "Email Verified",
      mail: isSent?.message || "Mail not sent",
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

    if (!updatePass)
      return res.status(404).json({
        success: false,
        message: "User not found for this email",
        code: 404,
      });

    res
      .status(200)
      .json({ success: true, message: "Password Updated", code: 200 });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      code: 500,
    });
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
      return res
        .status(401)
        .json({ success: false, message: "Old password not match", code: 401 });
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
    res
      .status(200)
      .json({ success: true, message: "Password Changed", code: 200 });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      code: 500,
    });
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
    if (allProducts.length === 0)
      return res.status(200).json({
        success: true,
        message: "Product not found",
        data: [],
        code: 200,
      });
    res.status(200).json({
      success: true,
      message: "All Products",
      data: allProducts,
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

//View One Product
const getOneProd = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, messages: "Product not found", code: 404 });
    res.status(200).json({
      success: true,
      message: "View Product",
      data: product,
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

//Order Product
const orderProduct = async (req, res) => {
  try {
    const { profileId, email } = req.user;
    const { ordered_products, shippingAddress } = req.body;
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
    if (!orders.length === 0)
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

//Get Categories
const getCategories = async (req, res) => {
  try {
    const allCategories = await Categories.find();
    if (!allCategories.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Categories not found", code: 404 });
    }
    res.status(200).json({
      success: true,
      message: "Categories Sent",
      data: allCategories,
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      Error: error.message,
      code: 500,
    });
  }
};

//Products for Specific Category
const productsForCategory = async (req, res) => {
  try {
    const products = await Products.find({ category: req.params.id });
    if (products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No products available",
        code: 200,
      });
    }
    res.status(200).json({
      success: true,
      message: "Available Products for this category",
      data: products,
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      Error: error.message,
      code: 500,
    });
  }
};

//Add Product to Wishlist
const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.profileId;
    const { productId } = req.body;
    const wishlist = await Wishlists.create({ userId, productId });

    res.status(201).json({
      success: true,
      message: "Product added to wishlist",
      data: wishlist,
      code: 201,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      Error: error.message,
      code: 500,
    });
  }
};

//View Wishlist
const viewWishlist = async (req, res) => {
  try {
    const userId = req.user.profileId;
    const wishlist = await Wishlists.find({ userId });
    if (wishlist.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No product in your wishlist",
        code: 200,
      });
    }
    res.status(200).json({
      success: true,
      message: "Your wishlist",
      data: wishlist,
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      Error: error.message,
      code: 500,
    });
  }
};

//Remove Product from Wishlist
const removeFromWL = async (req, res) => {
  try {
    const wishlist = await Wishlists.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product removed successfully",
      data: wishlist,
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      Error: error.message,
      code: 500,
    });
  }
};

//Reviews
const reviews = async (req, res) => {
  try {
    const review_by = req.user.profileId;
    const review = await Reviews.create({ review_by, ...req.body });
    res
      .status(201)
      .json({ success: true, message: "Feedback added", code: 201 });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      Error: error.message,
      code: 500,
    });
  }
};

//Update Reviews
const updateReviews = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Reviews.findByIdAndUpdate(
      req.params.id,
      {
        rating,
        comment,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Review Updated",
      data: review,
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      Error: error.message,
      code: 500,
    });
  }
};

//Delete Reviews
const delReviews = async (req, res) => {
  try {
    const review = await Reviews.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Review Deleted",
      data: review,
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      Error: error.message,
      code: 500,
    });
  }
};

//Get Reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find({ product: req.params.id });
    res
      .status(200)
      .json({ success: true, message: "Reviews", data: reviews, code: 200 });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      Error: error.message,
      code: 500,
    });
  }
};

//Export Functions
module.exports = {
  logIn,
  signUp,
  reviews,
  viewOrders,
  getReviews,
  delProfile,
  delReviews,
  updateUser,
  getOneProd,
  getProducts,
  verifyEmail,
  cancelOrder,
  viewWishlist,
  orderProduct,
  hashPassword,
  removeFromWL,
  updateReviews,
  addToWishlist,
  getCategories,
  validateEmail,
  resetPassword,
  forgetPassowrd,
  comparePassword,
  productsForCategory,
};
