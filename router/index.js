const router = require("express").Router();
const User = require("../model/register");
const profile = require("./profile");
const dashbord = require("./dashbord");
const stripeSecretKey = process.env.STRIPE_SEECRET_KEY;
router.use("/users", require("./user_router"));
router.use("/auth/", require("./auth"));
router.use("/profile", profile);
router.use("/dashbord", dashbord);
router.use("/paycallback", require("./payCallback"));

router.get("/logout", (req, res) => {
  req.logOut();
  return res.redirect("index");
});

router.all("*", (req, res, next) => {
  // console.log(404);
  try {
    let err = new Error("not founnd your page my frind");
    err.status = 404;
    throw err;
  } catch (err) {
    // console.log(err);
    next(err);
  }
});

router.use((err, req, res, next) => {
  // console.log(err);
  const code = err.status || "";
  const message = err.message || "";
  const stack = err.stack || "";

  if (config.debug == true) {
    res.render("errors/devloper", { messag: message, stack: stack });
  } else {
    res.render(`errors/${code}`, { messag: message });
  }
});

module.exports = router;
