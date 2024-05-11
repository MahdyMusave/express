const router = require("express").Router();
const { body, validationResult } = require("express-validator");
let users = require("./users");
router.get("/", (req, res) => {
  res.json({
    data: users,
    success: "your data is view" + true,
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
  res.json({
    data: user,
    success: "your data is view" + true,
  });
});

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("invalid name"),
    body("id").isNumeric().withMessage("id must number"),
    body("color").isString().withMessage("color must be color name"),
    body("year").isNumeric().withMessage("year must be number"),
    body("pantone_value")
      .isNumeric()
      .withMessage("pantone_value must be number"),
  ],

  (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      // return console.log(errors);
      console.log(errors.array());
      return res.status(400).json({
        error: errors,
      });
    }

    req.body.id = parseInt(req.body.id);

    users.push(req.body);

    res.json({ success: "you create new user" });
  }
);

router.put("/:id", (req, res) => {
  const userId = req.params.id;
  const updateUser = req.body;
  const findIndex = users.findIndex((user) => user.id == userId);

  if (findIndex !== -1) {
    // users[findIndex] = { ...users[findIndex], ...updateUser };
    // console.log(users[findIndex]={...updateUser});
    users[findIndex] = { ...updateUser };
    res.send("user update");
  } else {
    res.send(`No User with the id ${userId}`);
  }
});
router.delete("/:id", (req, res) => {
  // users.filter((user) => {
  //   // console.log(typeof user.id);
  //   console.log(typeof req.params.id);
  //   console.log(user.id != req.params.id);
  // });
  users = users.filter((user) => user.id !== parseInt(req.params.id));
  res.json({
    users: users,
    data: "your user delete",
    success: true,
  });
});

module.exports = router;
