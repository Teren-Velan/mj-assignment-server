const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 3002;

const app = express();
env.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@mjassignment.q8xdbgn.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("DB Connected Successfully");
  });

//routes
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

app.use(cors());

app.use(function (req, res, next) {
  console.log({ res });
  res.header("Access-Control-Allow-Origin", [
    "https://mighty-assignment.netlify.app",
    "https://mighty-assignment.netlify.app/",
  ]); //* to give access to any origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization" //to give access to all the headers provided
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET"); //to give access to all the methods provided
    return res.status(200).json({});
  }

  next(); //so that other routes can take over
});

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
