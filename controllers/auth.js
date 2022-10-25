const User = require("../models/User.model.js");
const jwt = require("jsonwebtoken");
const { mongoose } = require("mongoose");
const Product = require("../models/Product.model");

// exports.signup = (req, res) => {
//   console.log({ body: req });
//   User.findOne({ email: req?.body?.email })
//     // call back funtion means , it either gets back an error or your user that you looking for , so create a if statement for handling both cases
//     .exec((error, user) => {
//       //check if user is registered, if registered:
//       if (user)
//         return res.status(400).json({
//           message: "User already registered",
//         });
//       // destructuring the req.body
//       const { email, password } = req.body;
//       // if user not registered then we need to register user
//       // create new instance of the user
//       const _user = new User({
//         email,
//         password,
//       });

//       // save the new instance of user to db
//       _user.save((error, data) => {
//         if (error) {
//           console.log(error);
//           return res.status(400).json({
//             message: "Something unexpected has happened",
//           });
//         }

//         if (data) {
//           const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, {
//             expiresIn: "365d",
//           });

//           const { _id, email, fullname } = data;

//           res.status(200).json({
//             token,
//             data: {
//               _id,
//               email,
//               fullname,
//             },
//           });
//         }
//       });
//     });
// };

// const User = mongoose.model("User", User);

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
