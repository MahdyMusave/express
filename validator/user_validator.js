const { body } = require("express-validator");
class UseValidator {
  handle = () => {
    
      return[
        body("first_name").notEmpty().withMessage("invalid name"),
        body("email").isEmail().withMessage("invalid email"),
        body("password").isLength(8).withMessage("password must be 8 charcter"),
      ];
  };
}
module.exports = new UseValidator();
