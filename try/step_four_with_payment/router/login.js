const router = require("express").Router();
const Login = require("../model/register");
const passport = require("passport");

router.get("/", (req, res) => {
  // return console.log(req.session);
  res.render("login");
});
router.post(
  "/",
  passport.authenticate("local.login", {
    successRedirect: "/profile",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);
module.exports = router;
