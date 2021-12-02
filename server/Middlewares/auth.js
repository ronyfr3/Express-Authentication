const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/Users");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "you are not authorized" });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log(`decoded user`,decoded)
    req.user = await User.findById(decoded.id).select("-password");
    // console.log(req.user)
    next();
  } catch (error) {
    return res.status(401).json({message: "you are not authorized", error: error.message });
  }
});

const admin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({message: "Not authorized as an admin"});
  }
};

module.exports = { protect, admin };
