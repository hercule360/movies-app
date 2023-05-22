
const { check } = require("express-validator");
const { validationResult } = require('express-validator');


exports.signupvalidation = () => [
    check("name")
      .notEmpty().withMessage("Name is required")
      .isLength({ min: 4 }).withMessage("Name must be at least 4 characters long"),
    check("email")
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Invalid email address"),
    check("password")
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
  ];

  exports.validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
}