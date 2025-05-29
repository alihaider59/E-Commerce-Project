const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/E-Commerce-Data");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(`MongoDB Error: ${error}`);
  }
};

module.exports = connectDB