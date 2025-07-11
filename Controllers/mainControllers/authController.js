const dbConnection = require("../../DB/db");
dbConnection();

//Import Modules
const jwt = require("jsonwebtoken");

//Import Functions
const { hashPassword, comparePassword } = require("../../Utils/hashPassword");
const validateEmail = require("../../Utils/validateEmail");
const sendEmail = require("../../Utils/sendEmail");

//Imort Models
const UserProfiles = require("../../Models/userProfiles");
const UserLogins = require("../../Models/userLogins");

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
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
      });
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

//View Profile
const viewProfile = async (req, res) => {
  try {
    const { profileId } = req.user;
    const userProf = await UserProfiles.findOne({ _id: profileId });
    res.status(200).json({
      success: true,
      message: "Your profile",
      data: userProf,
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

//Export Functions
module.exports = {
  logIn,
  signUp,
  viewProfile,
  updateUser,
  delProfile,
  verifyEmail,
  forgetPassowrd,
  resetPassword,
};
