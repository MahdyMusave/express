const passport = require("passport");
let Users = require("../model/db");
class UserController {
  getLogin_form = (req, res, next) => {
    try {
      // return console.log(req.session);
      res.render("login");
    } catch (error) {
      next(error);
    }
  };

  getRegister_form = async (req, res, next) => {
    try {
      res.render("register", { msg_error: req.flash("error_msg") });
    } catch (error) {
      next(error);
    }
  };

  postLogin = async (req, res, next) => {
    try {
      passport.authenticate("local.login", (err, user) => {
        if (!user) return res.redirect("/auth/login");
        // console.log("is ready to login");
        req.logIn(user, (err) => {
          return res.redirect("/profile");
        });
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  PostRegister = () => {};
}

module.exports = new UserController();
