const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .then(() => {
    console.log("connection to db");
  })
  .catch((err) => {
    console.log(err);
  });

const Schema = mongoose.Schema;
const userSchema = new Schema({
  userid:{type:Number},
  first_name: {type:String},
  email: {type:String},
  password: {type:String},
});

module.exports = mongoose.model("User", userSchema, "User");
