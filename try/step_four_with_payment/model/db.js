const mongoose = require("./connect");


const Schema = mongoose.Schema;
const userSchema = new Schema({
  userid:{type:Number},
  first_name: {type:String},
  blance:{type:Number,default:0},
  email: {type:String,required:true},
  password: {type:String,required:true},
});

module.exports = mongoose.model("User", userSchema, "User");
