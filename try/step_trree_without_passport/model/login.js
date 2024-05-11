const mongoose = require("./connect");
// const db = require("./connect");
const Schema = mongoose.Schema;
const LoginSchema = new Schema({
  email: { type: String },
  password: { type: String },
});
// const registerModel = mongoose.model("Register", registerSchema, "Register");
// const newModel = new registerModel({
//   first_name: "ali",
//   email: "ali@gmail.com",
//   password: "jckxhjc",
// });
// console.log(newModel);

module.exports = mongoose.model("Login", LoginSchema, "Login");
