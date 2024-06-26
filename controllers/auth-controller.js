import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const secret = process.env.SECRET_KEY;

export const generateAccessToken = async (user) => {
  return jwt.sign({ _id: user._id, role: user.role }, secret, {
    expiresIn: "7d",
  });
};

export const handleServerError = (res, error, message) => {
  console.error(`${message}:`, error);
  res.status(500).json({ error: "Internal Server Error" });
};

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  if (
    !email ||
    !password ||
    !username === undefined ||
    username?.length === 0
  ) {
    return res.json(403).json({ error: "Invalid cradentials" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "user",
    });
    await newUser.save();

    const accessToken = await generateAccessToken(newUser);
    res.status(201).json({ newUser, accessToken });
  } catch (error) {
    handleServerError(res, error, "Error during registration");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json(403).json({ error: "Invalid cradentials" });
    }

    const user = await User.findOne({ email });
    if (!user || !bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: "Invalid cradentials" });
    }

    const accessToken = await generateAccessToken(user);

    res.status(200).json({ accessToken, user });
  } catch (error) {
    handleServerError(res, error, "Error during login");
  }
};

export const refresh = async (req, res) => {
  try {
    const existingUser = await User.findById(req.user._id);
    if (!existingUser) {
      return res.status(401).json({ error: "User not found" });
    }

    res.status(200).json({ user: existingUser });
  } catch (error) {
    handleServerError(res, error, "Error during auto login");
  }
};
