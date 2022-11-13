const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
require("dotenv").config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/products", productRoutes)

mongoose
  .connect(process.env.MONGOOSE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port: ${PORT}`)
    })
  })
  .catch((error) => console.error("MongoDB connection failed:", error.message))
  const PORT = process.env.PORT || 3030
