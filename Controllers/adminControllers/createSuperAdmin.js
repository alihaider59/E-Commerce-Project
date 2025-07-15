require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserLogins = require("../../Models/userLogins");
const UserProfiles = require("../../Models/userProfiles");

const createSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const existing = await UserLogins.findOne({
      email: "superadmin@example.com",
    });
    if (existing) {
      console.log("Super Admin already exists.");
      return;
    }

    const profile = {
      name: "Super Admin",
      address: "Admin HQ",
      country: "Global",
      phone: "0000000000",
      role: "superadmin",
    };

    const savedProfile = await UserProfiles.create(profile);

    const hashedPassword = await bcrypt.hash("SuperSecretPassword123!", 10);

    const superAdminLogin = {
      email: "superadmin@example.com",
      password: hashedPassword,
      profileId: savedProfile._id,
    };

    await UserLogins.create(superAdminLogin);

    console.log("Super Admin created!");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    mongoose.connection.close();
    console.log("Database connection closed.");
  }
};

createSuperAdmin();
