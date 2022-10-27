const User = require("../models/User.model.js");
const jwt = require("jsonwebtoken");
const { mongoose } = require("mongoose");
const Product = require("../models/Product.model");

//signin api
exports.signin = async (req, res) => {
  let user;
  let productList;

  try {
    user = await User.findOne({ email: req.body.email });
  } catch (error) {
    return res.status(400).json({
      error: { message: "Unexpected error occured.Please try again" },
    });
  }

  if (user) {
    if (user.authenticate(req.body.password)) {
      const token = jwt.sign(
        { _id: user._id, email: req.body.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "365d",
        }
      );
      const { _id, email } = user;

      try {
        productList = await Product.find({ user: _id });
      } catch (error) {
        console.log({ error });
      }

      return res.json({
        token,
        user: {
          _id,
          email,
          products: productList,
        },
      });
    } else {
      return res.status(400).json({
        error: { message: "In correct login credentials , please try again" },
      });
    }
  } else {
    return res.status(400).json({
      error: {
        message: "User does not exist , please signup before trying again",
      },
    });
  }
};
//signin with token api
exports.signinWithToken = async (req, res) => {
  let user;
  let productList;
  try {
    user = await User.findOne({ _id: req.user._id });
  } catch (error) {
    return res.status(400).json({
      error: { message: "Invalid token received." },
    });
  }

  if (user) {
    const { email } = user;
    try {
      productList = await Product.find({ user: req.user._id });
    } catch (error) {
      console.log({ error });
    }

    return res.json({
      user: {
        _id: req.user._id,
        email,
        products: productList,
      },
    });
  } else {
    return res.status(400).json({
      error: {
        message: "Invalid token received.",
      },
    });
  }
};
