const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String },
  username: { type: String },
  password: { type: String },
});

module.exports = model("User", userSchema);
