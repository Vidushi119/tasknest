const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");

/**
 * @desc    Register new user
 * @route   POST /auth/register
 */
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  // check existing user
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // create user
  const user = await User.create({ email, password });

  res.status(201).json({
    _id: user._id,
    email: user.email,
  });
});

module.exports = { registerUser };
