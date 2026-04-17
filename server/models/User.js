const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    otp: String,
    otpExpires: Date,
    mobileNumber: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);