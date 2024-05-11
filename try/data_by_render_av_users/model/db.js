const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .then(() => {
    console.log("connection to db");
  })
  .catch((err) => {
    console.log(err);
  });
const userSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);