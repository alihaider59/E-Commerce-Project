//Import Functions
const { hashPassword, comparePassword } = require("../../Utils/hashPassword");
const validateEmail = require("../../Utils/validateEmail");
const sendEmail = require("../../Utils/sendEmail");

//Imort Models
const UserProfiles = require("../../Models/userProfiles");
const UserLogins = require("../../Models/userLogins");


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
    const allProfiles = await UserProfiles.find();
    if (allProfiles.length === 0)
      return res.status(200).json({
        success: true,
        message: "Not any user registered",
        data: [],
        code: 200,
      });
    res.status(200).json({
      success: true,
      message: "All User's Profiles",
      data: allProfiles,
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
module.exports = { createAdmin, getUsers };