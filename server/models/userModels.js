const mongoose = require('mongoose')

const user = new mongoose.Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String,
    default: 'user'
  }
})

const User = mongoose.model("User", user);

module.exports = User;
