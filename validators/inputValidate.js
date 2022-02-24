const { check } = require("express-validator");

const userValidator = [
  check("email", "email must not be empty").not().isEmpty(),
  check("user_name", "username must not be empty").not().isEmpty(),
  check("first_name", "first_name must not be empty").not().isEmpty(),
  check("last_name", "last_name must not be empty").not().isEmpty(),
  check("password", "password must not be empty").not().isEmpty(),
];

userValidator;
module.exports = { userValidator };
