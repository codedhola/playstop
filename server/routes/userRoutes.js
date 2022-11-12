const router = require("express").Router()
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")

router.get("/", (req, res) => {
  res.send("welcome to the project")
})



module.exports = router
