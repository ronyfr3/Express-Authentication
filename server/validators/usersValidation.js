const { check, validationResult } = require("express-validator");

const userRegisterValidation = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Must be a valid email address & password required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const userSigninValidation = [
  check("email").isEmail().withMessage("Must be a valid email address & password required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const runValidation = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    })
  }
  next()
}

module.exports =  { userRegisterValidation, userSigninValidation, runValidation };