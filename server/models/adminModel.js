const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 20,
    required: [true, "admin must specify a name"]
  },
  email: {
    type: String,
    required: [true, "admin must provide a valid Email"]
  },
  password: {
    type: String,
    required: [true, "please provide a strong password"]
  }
})

const admin = mongoose.model("admin", adminSchema)
module.exports = admin
