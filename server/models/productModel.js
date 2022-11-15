const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 20,
    required: [true, "Please specify product"]
  },
  type: {
    type: String,
    default: "Gaming"
  },
  image: String,
  amount: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const Product = mongoose.model("product", productSchema)
module.exports = Product
