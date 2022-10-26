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

// var corsOptions = {
//   origin: [
//     "https://mighty-assignment.netlify.app",
//     "https://mighty-assignment.netlify.app/",
//     "http://localhost:3000",
//     "http://localhost:3000/",
//   ],
//   optionsSuccessStatus: 200,
//   withCredentials,
// };
app.use(cors());

// app.use(function (req, res, next) {
//   let allowedOrigins = [
//     [
//       "https://mighty-assignment.netlify.app",
//       "https://mighty-assignment.netlify.app/",
//       "http://localhost:3000",
//       "http://localhost:3000/",
//     ],
//   ];
//   let origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }

//   next();
// });

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
