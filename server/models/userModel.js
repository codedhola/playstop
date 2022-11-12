const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 20,
    required: [true, "user must specify a name"]
  },
  email: {
    type: String,
    required: [true, "User must provide a valid Email"]
  },
  password: {
    type: String,
    required: [true, "please provide a strong password"]
  }
})

const User = mongoose.model("user", userSchema)
module.exports = User
