const mongoose = require("mongoose");

const User = mongoose.model("User", {
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  email: {
    unique: true,
    type: String,
  },
  token: String,
  salt: String,
  hash: String,
});

module.exports = User;
