const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB");

    const email = "admin@nexura.ai";
    const password = "AdminPassword123!";
    const name = "Nexura Administrator";

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const admin = await User.create({
      name,
      email,
      passwordHash,
      role: "admin",
    });

    console.log("Admin created successfully");
    console.log("Email:", admin.email);

    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin:", error.message);
    process.exit(1);
  }
};

createAdmin();