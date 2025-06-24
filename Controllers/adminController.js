//Import Functions
const { hashPassword, comparePassword } = require("../Utils/hashPassword");
const validateEmail = require("../Utils/validateEmail");

//Import Models
const Orders = require("../Models/orders");
const Reviews = require("../Models/reviews");
const Products = require("../Models/products");
const Categories = require("../Models/category");
const UserLogins = require("../Models/userLogins");
const GlobalDeals = require("../Models/globalDeals");
const UserProfiles = require("../Models/userProfiles");

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
      return res
        .status(400)
        .json({ success: false, message: "Email not valid", code: 400 });
    }
    const isExisting = await UserLogins.findOne({ email });
    if (isExisting) {
      return res
        .status(409)
        .json({ success: false, message: "User already Exist", code: 409 });
    }
    const hashedPass = await hashPassword(password);
    const newAdmin = await UserProfiles.create({ role: "admin", ...otherData });
    const loginData = await UserLogins.create({
      email,
      password: hashedPass,
      profileId: newAdmin._id,
    });
    res
      .status(201)
      .json({ success: true, message: "Admin Created", code: 201 });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      code: 500,
    });
  }
};

//Get Users
const getUsers = async (req, res) => {
  try {
    const allProfiles = await UserProfiles.find()
    if(allProfiles.length === 0) return res.status(200).json({success: true, message: "Not any user registered", data: [], code: 200})
  } catch (error) {
     res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      code: 500,
    });
  }
}

//Add Product
const addProduct = async (req, res) => {
  try {
    const { flashDeal, ...product } = req.body;
    const now = new Date();
    let newProduct;
    if (
      flashDeal?.isActive &&
      now >= new Date(flashDeal.startTime) &&
      now <= new Date(flashDeal.endTime)
    ) {
      const discountedPrice =
        product.price - (product.price * flashDeal.discountPercent) / 100;
      newProduct = await Products.create({
        discountedPrice,
        flashDeal,
        ...product,
      });
      product.dealType = "flash";
    } else {
      newProduct = await Products.create({ ...product });
    }
    res.status(201).json({
      success: true,
      message: "Product Added",
      data: newProduct,
      code: 201,
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

//View Products
const getProducts = async (req, res) => {
  try {
    const allProducts = await Products.find();
    if (allProducts.length === 0)
      return res.status(200).json({
        success: true,
        message: "Not any product found",
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

//Edit or Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found", code: 404 });
    const updateFields = {
      ...product._doc,
      ...req.body,
    };
    const updatedProd = await Products.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Product Updated",
      data: updatedProd,
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

//Delete Product
const delProduct = async (req, res) => {
  try {
    const delProd = await Products.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product Deleted",
      data: delProd,
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

//Create Category
const createCtgry = async (req, res) => {
  try {
    const category = req.body;
    const newCtgry = await Categories.create(category);
    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: newCtgry,
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
    if (allCategories.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Categories not found",
        data: [],
        code: 200,
      });
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
      error: error.message,
      code: 500,
    });
  }
};

//Update Category
const updateCtgry = async (req, res) => {
  try {
    const ctgryFields = req.body;
    const category = await Categories.findByIdAndUpdate(
      req.params.id,
      {
        $set: ctgryFields,
      },
      { new: true }
    );

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found", code: 404 });
    }

    res.status(200).json({
      success: true,
      message: "Category Updated",
      data: category,
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

//Delete Category
const delCtgry = async (req, res) => {
  try {
    const category = await Categories.findByIdAndDelete(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found", code: 404 });
    }

    res.status(200).json({
      success: true,
      message: "Category Deleted",
      data: category,
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

//Delete Reviews
const delReviews = async (req, res) => {
  try {
    const review = await Reviews.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Review deleted by admin",
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

//Add / Remove / Edit Flash Deals
const addDeals = async (req, res) => {
  try {
    const { discountPercent, flashDeal } = req.body;
    if (
      [flashDeal?.discountPercent, discountPercent].some(
        (val) => val < 0 || val > 100
      )
    )
      return res.status(400).json({
        success: false,
        message: "Invalid discount percentage",
        code: 400,
      });
    if (
      discountPercent === 0 ||
      flashDeal.discountPercent === 0 ||
      !flashDeal.isActive
    ) {
      const product = await Products.findByIdAndUpdate(
        req.params.id,
        {
          $unset: { discountedPrice: "", flashDeal },
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Discount Removed",
        data: product,
        code: 200,
      });
    }
    const product = await Products.findById(req.params.id);
    const price = product.price;
    const discount = (price * flashDeal.discountPercent) / 100;
    const discountedPrice = price - discount;
    const discountedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      { flashDeal, discountedPrice },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Discount Added",
      data: discountedProduct,
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

//Global Deals
const globalDeals = async (req, res) => {
  try {
    const dealData = req.body;
    const newDeal = await GlobalDeals.create(dealData);
    res.status(201).json({
      success: true,
      message: "Global deal created",
      data: newDeal,
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

//Update Global Deals
const updateGlobalDeals = async (req, res) => {
  try {
    const dealData = req.body;
    const deal = await GlobalDeals.findByIdAndUpdate(
      req.params.id,
      { $set: dealData },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "Deal updated", data: deal, code: 200 });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      Error: error.message,
      code: 500,
    });
  }
};

//Delete Global Deals
const delGlobalDeals = async (req, res) => {
  try {
    const deal = await GlobalDeals.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Deal deleted", data: deal, code: 200 });
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
  delOrder,
  addDeals,
  delCtgry,
  getReviews,
  delReviews,
  addProduct,
  viewOrders,
  delProduct,
  getProducts,
  createCtgry,
  updateCtgry,
  createAdmin,
  globalDeals,
  cancelOrder,
  updateStatus,
  getCategories,
  updateProduct,
  delGlobalDeals,
  updateGlobalDeals,
};
