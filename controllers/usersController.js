const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc    Get all users
// @route   GET /users
// @access  Private
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users.length) {
    return res.status(400).json({ message: "No users" });
  }
  res.json(users);
});

// @desc    Get all users not payed
// @route   GET /users/not-payed
// @access  Private
exports.getUsersNotPayed = asyncHandler(async (req, res) => {
  const users = await User.find({ hasPayed: false }).select("-password").lean();
  if (!users.length) {
    return res.status(400).json({ message: "No users not payed" });
  }
  res.json(users);
});

// @desc    Get user by id
// @route   GET /users/:id
// @access  Private
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Create user
// @route   POST /users
// @access  Private
exports.createUser = asyncHandler(async (req, res) => {
  const { fname, lname, email } = req.body;
  const duplicate = await User.findOne({ email }).lean().exec();
  if (duplicate) {
    res.status(409).json({ message: "Email already exists" });
  }

  const userObject = { fname, lname, email };
  const user = await User.create(userObject);
  if (user) {
    res
      .status(201)
      .json({ message: `New user ${user.fname} ${user.lname} created` });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

// @desc    Update user
// @route   PATCH /users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res) => {
  const { id, fname, lname, email, hasPayed, active } = req.body;

  const user = await User.findById(id).excec();
  if (!user) {
    res.status(400).json({ message: "User not find" });
  }

  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate && duplicate?._id.toString() !== id) {
    res.status(409).json({ message: "Email already exists" });
  }

  user.fname = fname;
  user.lname = lname;
  user.email = email;
  user.hasPayed = hasPayed;
  user.active = active;

  const updatedUser = await user.save();
  res.json(updatedUser);
});

// @desc    Delete user
// @route   DELETE /users/:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({ message: "No id provided" });
  }

  const user = await User.findById(id).exec();
  if (!user) {
    res.status(400).json({ message: "No user" });
  }
  const result = await user.deleteOne();

  const reply = `User ${user.fname} ${user.lname} removed`;
  res.json(reply);
});
