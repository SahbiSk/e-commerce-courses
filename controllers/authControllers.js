const User = require("../models/user");
const bcrypt = require("bcrypt");
const { ErrorHandler } = require("../utils/ErrorHandler");
const NODE_ENV = process.env.NODE_ENV;
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const encryptPW = async (password) => {
  return await bcrypt.hash(password, 12);
};

exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new ErrorHandler(400, "Please enter and email and password"));

    if (password.length < 8)
      return next(new ErrorHandler(401, "Password must be 8 characters"));

    const pw = await encryptPW(password);

    const newUser = await User.create({
      email,
      password: pw,
    });
    newUser.password = undefined;

    newUser.sendToken(201, req, res);
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler(400, "Incorrect email or password"));
    }
    const compared = await bcrypt.compare(password, user.password);
    user.password = undefined;
    if (!compared) {
      return next(new ErrorHandler(400, "Incorrect email or password"));
    }
    user.sendToken(200, req, res);
  } catch (err) {
    return next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const options = {
      expires: new Date(Date.now + 10000),
      secure: NODE_ENV === "production",
      httpOnly: NODE_ENV === "production",
    };
    res.cookie("jwt", "expiredtoken", options);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return next(err);
  }
};

const decryptJwt = async (token) => {
  return await jwt.verify(token, JWT_SECRET);
};

exports.checkUserCred = async (req, res, next) => {
  try {
    let token;
    if (req.cookies) token = req.cookies.jwt;
    if (!token || token === "expiredtoken") {
      return next(
        new ErrorHandler(401, "User does not have valid credentials")
      );
    }

    const jwtInfo = await decryptJwt(token);

    if (jwtInfo.exp < Date.now() / 1000) {
      return next(
        new ErrorHandler(401, "User does not have valid credentials")
      );
    }
    const user = await User.findById(jwtInfo.id);
    if (!user) {
      return next(new ErrorHandler(404, "User not found"));
    }
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    return next(error);
  }
};
