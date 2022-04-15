const { check, validationResult } = require('express-validator');

exports.validateSignUp = [
  check("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("User name can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 4 characters required!")
    .bail(),
  check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email address!")
    .bail(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long!"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({
        errors: errors.array(),
      });
    next();
  },
];

exports.validateSignIn = [
  check("email")
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("Invalid email address!")
    .bail(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({
        errors: errors.array(),
      });
    next();
  },
];

