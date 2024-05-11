const router = require("express").Router();
const { body, validationResult } = require("express-validator");
// let users = require("../users");
let Users = require("../model/db");
router.get("/", async (req, res) => {
  // console.log(req.flash("errors_msg"));
  let users = await Users.find({});
  // console.log(users);
  res.render("users", {
    users: users,
    masg_errors: req.flash("errors_msg"),
    msg_update: req.flash("msg_update"),
    msg_delete: req.flash("msg_delete"),
  });
});

router.get("/:userid", async (req, res) => {
  let users = await Users.findOne({ userid: req.params.userid });
  res.render("user", { user: users });
});

router.post(
  "/",
  [
    body("userid").isNumeric().withMessage("userid must number"),
    body("first_name").notEmpty().withMessage("invalid name"),
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength(8).withMessage("password must be 8 charcter"),
  ],

  async (req, res) => {
    // console.log(req.body);
    const result_errors = validationResult(req);
    // console.log(errors);
    if (!result_errors.isEmpty()) {
      // return console.log(errors);
      req.flash("errors_msg", result_errors.array());
      return res.redirect("/users");
    }

    let users = await new Users({
      userid: req.body.userid,
      first_name: req.body.first_name,
      email: req.body.email,
      password: req.body.password,
    });
    const result = await users.save();
    console.log(result);
    return res.redirect("/users");
  }
);

router.put("/:userid", async (req, res) => {
  const users = await Users.updateOne(
    { userid: req.params.userid },
    {
      // $set: {
      //   userid: req.body.userid,
      //   first_name: req.body.first_name,
      //   email: req.body.email,
      //   password: req.body.password,
      // },
      $set: req.body,
    }
  );
  req.flash("msg_update", "your user update with successfuly");
  return res.redirect("/users");
});
router.delete("/:userid", async (req, res) => {
  const user = await Users.deleteOne({ userid: req.params.userid });
  req.flash("msg_delete", "your user delete with successfuly");
  return res.redirect("/users");
});

module.exports = router;
