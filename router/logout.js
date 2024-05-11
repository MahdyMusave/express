const router = require("express").Router();

router.get("/", (req, res) => {
  // return console.log("reaasa");
  req.logout();
  return res.redirect("/aut/login");
});
module.exports = router;
