import connectDB from "../../config/db/db.js";
import usersModel from "../../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const allUsers = async (req, res) => {
  await connectDB();
  const users = await usersModel.find();
  res.send(users);
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usersModel.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      userToken,
      userInfo: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Server error:", error); // Log the error
    res.status(500).json({ message: "Server error" });
  }
};
const loginWithGooglePopup = async (req, res) => {
  const { email, uid, name, dateOfBirth, gender } = req.body;

  try {
    // Find user by email
    let user = await usersModel.findOne({ email });

    // If user doesn't exist, create a new one
    if (!user) {
      user = new usersModel({
        email,
        name,
        dateOfBirth,
        gender,
        password: null, // Set password to null for Google users
      });
      await user.save();
    }

    // Generate JWT token
    const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with user data and token
    res.json({
      userToken,
      userInfo: {
        id: user._id,
        email: user.email,
        name: user.name,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const registerUser = async (req, res) => {
  const { name, dateOfBirth, gender, email, uid, password } = req.body;

  try {
    // Check if user already exists
    let user = await usersModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const bcryptPass = bcrypt.hash(password, 7);
    console.log(bcryptPass);
    // Create new user
    user = new usersModel({
      name,
      dateOfBirth,
      gender,
      email,
      uid,
      password: password,
    });

    await user.save();

    // Generate JWT token
    const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with user data and token
    res.json({
      userToken,
      userInfo: {
        id: user._id,
        name: user.name,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { allUsers, loginUser, loginWithGooglePopup, registerUser };
