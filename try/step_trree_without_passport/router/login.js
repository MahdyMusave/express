const router = require("express").Router();
const Login = require("../model/register");

router.get("/", (req, res) => {
  // return console.log(req.session);
  res.render("login");
});
router.post("/", async (req, res) => {
  // console.log(req.body);
  const check_user = await Login.findOne({
    email: req.body.email,
  });
  // console.log(check_user);
  if (check_user.email === req.body.email) {
    if (check_user.password === req.body.password) {
      const session = req.session;
      session.userEmail = req.body.email;
      session.email = check_user.email;
      // console.log(req.session);
      return res.redirect("/profile");
    } else {
      return res.send("password is not currect");
    }
  } else {
    return res.send("not found your email");
  }
});
module.exports = router;
