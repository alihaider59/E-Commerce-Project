require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserLogins = require("../../Models/userLogins"); 

const createSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await UserLogins.findOne({
      email: "superadmin@example.com",
    });
    if (existing) {
      console.log("Super Admin already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash("SuperSecretPassword123!", 10);

    const superAdmin = new UserLogins({
      email: "superadmin@example.com",
      password: hashedPassword,
      role: "superadmin",
    });

    await superAdmin.save();
    console.log("Super Admin created!");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

createSuperAdmin();
