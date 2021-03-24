const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const NODE_ENV = process.env.NODE_ENV;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;
const JWT_EXPERATION_NUM = process.env.JWT_EXPERATION_NUM;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Email is invalid"],
    validate: [validator.isEmail, "Email is invalid"],
  },
  password: {
    type: String,
    select: false,
  },
  clearance: {
    type: String,
    enum: {
      values: ["user", "instructor", "admin"],
    },
    default: "user",
  },
});

userSchema.methods.makeJwt = function () {
  return jwt.sign({ id: this.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
};

userSchema.methods.sendToken = function (statusCode, req, res) {
  const token = this.makeJwt();
  const user = this;
  const options = {
    expires: new Date(Date.now() + JWT_EXPERATION_NUM),
    secure: NODE_ENV === "production",
    httpOnly: NODE_ENV === "production",
  };
  res.cookie("jwt", token, options);
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
