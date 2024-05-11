let Users = require("../model/db");
const { body, validationResult } = require("express-validator");

class UserController {
  getUsers = async (req, res, next) => {
    try {
      // console.log(req.flash("errors_msg"));
      let users = await Users.find({});
      // console.log(users);
      res.render("users", {
        users: users,
        masg_errors: req.flash("errors_msg"),
        msg_update: req.flash("msg_update"),
        msg_delete: req.flash("msg_delete"),
      });
    } catch (error) {
      next(error);
    }
  };
  getOne_User = async (req, res, next) => {
    try {
      let users = await Users.findOne({ _id: req.params.userid });
      res.render("user", { user: users });
    } catch (error) {
      next(error);
    }
  };

  postUser = async (req, res, next) => {
    try {
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
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const users = await Users.updateOne(
        { _id: req.params.userid },
        {
          $set: req.body,
        }
      );
      req.flash("msg_update", "your user update with successfuly");
      return res.redirect("/users");
    } catch (err) {
      next(err);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const user = await Users.deleteOne({ _id: req.params.userid });
      req.flash("msg_delete", "your user delete with successfuly");
      return res.redirect("/users");
    } catch (error) {
      next(err);
    }
  };
}

module.exports = new UserController();
