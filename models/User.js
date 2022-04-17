const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {timestamp: true});

module.exports = mongoose.model("User", UserSchema);
