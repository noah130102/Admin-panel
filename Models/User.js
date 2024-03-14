const { default: mongoose, mongo } = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, required: true, default: "user" },
  photo: { type: String, required: true },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
