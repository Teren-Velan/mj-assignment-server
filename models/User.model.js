const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 30,
      unique: true,
      lowercase: true,
    },
    hashPassword: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 15,
    },
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
  this.hashPassword = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hashPassword);
  },
};

module.exports = mongoose.model("User", userSchema);
