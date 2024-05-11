const router = require("express").Router();
const { response } = require("express");
const register = require("../model/register");
const { body, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  // console.log(req.flash("error_msg"));
  res.render("register", { msg_error: req.flash("error_msg") });
});
router.post(
  "/",
  [
    // Validate fields
    body("first_name").notEmpty().withMessage("firstname can not be number"),
    body("email").isEmail().withMessage("is invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must 6 charcter"),
  ],
  async (req, res) => {
    // console.log(req.body);
    const error = validationResult(req);
    if (!error.isEmpty()) {
      req.flash("error_msg", error.array());
    }
    // return console.log(error);
    const data = await new register({
      first_name: req.body.first_name,
      email: req.body.email,
      password: req.body.password,
    });
    const response = await data.save();
    // console.log(response);
    return res.redirect("/auth/register");
  }
);

module.exports = router;
