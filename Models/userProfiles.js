const mongoose = require("mongoose");

const profilesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    default: "user",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const userProfiles = mongoose.model("User-Profiles", profilesSchema);
module.exports = userProfiles;
