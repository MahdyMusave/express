const express = require("express");
const router = express.Router();
const User = require("../model/db");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const register = require("../model/register");

router.get("/", async (req, res) => {
  res.render("register", { msg_error: req.flash("error_msg") });
});

router.post(
  "/",
  [
    body("first_name").notEmpty().withMessage("firstname can not be empty"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error_msg", errors.array());
      return res.redirect("/register");
    }

    passport.authenticate("local.register", (err, registerUser, info) => {
      if (err) {
        return next();
      }
      if (!registerUser) {
        req.flash("error_msg", "register Failed");
        return res.redirect("/register");
      }
      console.log(registerUser, "registerUser");
      req.login(registerUser, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/auth/login");
      });
    })(req, res, next);
  }
);


module.exports = router;
