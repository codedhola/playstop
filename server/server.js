const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const adminRoutes = require("./routes/adminRoutes")
const productRoutes = require("./routes/productRoutes")
// const expressFile = require("express-fileupload")
require("dotenv").config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
// app.use(expressFile({createParentPath: true}))
app.use("/api/v1/admin", adminRoutes)
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
