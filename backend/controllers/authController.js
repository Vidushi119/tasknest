const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");
const generateToken = require("../utils/generateToken");

/**
 * @desc    Register new user
 * @route   POST /auth/register
 */
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ email, password });

  res.status(201).json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
});

/**
 * @desc    Login user
 * @route   POST /auth/login
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

module.exports = { registerUser, loginUser };

