const router = require("express").Router();
router.use((req, res, next) => {
  // console.log(req.session.email );
  if (req.session.userEmail === req.session.email) {
    next();
  }
});

router.get("/", (req, res) => {
  res.render("profile");
});
module.exports = router;
