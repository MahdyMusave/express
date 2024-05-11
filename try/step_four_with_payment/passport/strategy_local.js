const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/db");

passport.serializeUser((user, done) => {
  console.log(user, "this is serializeUser");
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  console.log(user, "this is deserializeUser");
  if (user) {
    done(null, user);
  }
});

passport.use(
  "local.login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({
          email: email,
        });
        console.log(user, "login user");
        if (!user || user.password !== password) {
          return done(
            null,
            false,
            req.flash("msg_error", "not found your email")
          );
        }
        done(null, user);
      } catch (err) {
        done(err, false, { error: "msg_error" });
      }
    }
  )
);

passport.use(
  "local.register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({
          email: email,
        });
        if (user) {
          return done(
            null,
            false,
            req.flash("msgg_error", "this user sign up")
          );
        }
        const newUser = await new User({
          first_name: req.body.first_name,
          email: req.body.email,
          passport: req.body.passport,
        });
        await newUser.save();
        done(null, newUser);
      } catch (err) {
        done(null, flase, { msg_error: "msgg_error"});
      }
    }
  )
);

module.exports = passport;
