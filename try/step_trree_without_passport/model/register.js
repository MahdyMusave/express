const mongoose = require("./connect");
// const db = require("./connect");
const Schema = mongoose.Schema;
const registerSchema = new Schema({
  first_name: { type: String },
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

module.exports = mongoose.model("Register", registerSchema, "Register");
