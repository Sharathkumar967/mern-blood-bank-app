const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    // validation
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User Already exists",
      });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    // rest of the data

    const user = new userModel(req.body);
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const existingUser = await userModel
      .findOne({ email: req.body.email })
      .exec();
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    if (existingUser.role !== req.body.role) {
      return res.status(500).send({
        success: false,
        message: "role dosent match",
      });
    }

    // Compare password
    const comparePassword = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );

    if (!comparePassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).send({
      success: true,
      message: "Login Successful",
      token,
      user: existingUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error: error.message,
    });
  }
};

const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Unable to get current user",
      error: err.message,
    });
  }
};

module.exports = { registerController, loginController, currentUserController };
