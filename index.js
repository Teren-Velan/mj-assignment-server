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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

app.use("/public/uploads", express.static("uploads"));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
