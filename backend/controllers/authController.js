import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
  name,
  email,
  password: hashedPassword,
  role,
  phone,
});

const createdUser = {
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
};

res.status(201).json({
  success: true,
  message: "User registered successfully",
  user: createdUser,
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};