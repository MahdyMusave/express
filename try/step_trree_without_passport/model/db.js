const mongoose = require("./connect");


const Schema = mongoose.Schema;
const userSchema = new Schema({
  userid:{type:Number},
  first_name: {type:String},
  email: {type:String},
  password: {type:String},
});

module.exports = mongoose.model("User", userSchema, "User");
