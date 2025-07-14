const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User-Profiles",
    required: true,
  },
  refreshToken:{
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userLogins = mongoose.model("User-Logins", loginSchema);
module.exports = userLogins;
