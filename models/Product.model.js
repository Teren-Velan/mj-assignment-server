const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
