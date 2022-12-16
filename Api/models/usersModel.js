const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  is_admin: {
    required: true,
    default: false,
    type: Boolean,
  },
  username: {
    required: true,
    type: String,
  },
  firstname: {
    required: true,
    type: String,
  },
  lastname: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  number: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  location: {
    required: true,
    type: String,
  },
});

const Users = mongoose.model("User", userSchema);
module.exports = Users;
