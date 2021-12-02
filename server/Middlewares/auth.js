const jwt =require("jsonwebtoken");
const asyncHandler =require("express-async-handler");
const User =require("../models/Users");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded)

      req.user = await User.findById(decoded._id).select('-hashed_password');
      console.log(req.user)

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token filed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorization, no token");
  }
});

const admin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

module.exports =  { protect, admin };
