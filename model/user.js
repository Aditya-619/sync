const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, default: 'newuser' },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
});

module.exports = model("User", userSchema);
