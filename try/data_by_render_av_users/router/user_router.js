const router = require("express").Router();
const { body, validationResult } = require("express-validator");
let users = require("../users");
router.get("/", (req, res) => {
  // console.log(req.flash("errors_msg"));
  res.render("users", {
    users: users,
    masg_errors: req.flash("errors_msg"),
    msg_update: req.flash("msg_update"),
    msg_delete: req.flash("msg_delete"),
  });
});

router.get("/:id", (req, res) => {
  const user = users.find((user) => {
    // console.log(user.id)
    // console.log(user.id == req.params.id);
    if (user.id == req.params.id) {
      return user;
    }
  });
  res.render("user", { user, user });
});

router.post(
  "/",
  [
    body("id").isNumeric().withMessage("id must number"),
    body("first_name").notEmpty().withMessage("invalid name"),
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength(8).withMessage("password must be 8 charcter"),
  ],

  (req, res) => {
    // console.log(req.body);
    const result_errors = validationResult(req);
    // console.log(errors);
    if (!result_errors.isEmpty()) {
      // return console.log(errors);
      req.flash("errors_msg", result_errors.array());
      return res.redirect("/users");
    }

    req.body.id = parseInt(req.body.id);

    users.push(req.body);

    // res.json({ success: "you create new user" });
    return res.redirect("/users");
  }
);

router.put("/:id", (req, res) => {
  users = users.map((user) => {
    if (user.id === parseInt(req.params.id)) {
      // return req.body;
      req.body.id = parseInt(req.body.id);
      // console.log(req.body);
      return req.body;
    } else {
      return user;
    }
  });
  req.flash("msg_update", "your user update with successfuly");
  return res.redirect("/users");
});
router.delete("/:id", (req, res) => {
  // users.filter((user) => {
  //   // console.log(typeof user.id);
  //   console.log(typeof req.params.id);
  //   console.log(user.id != req.params.id);
  // });
  users = users.filter((user) => user.id !== parseInt(req.params.id));
  req.flash("msg_delete", "your user delete with successfuly");
  return res.redirect("/users");
});

module.exports = router;
