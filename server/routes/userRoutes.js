const router = require("express").Router()
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")

router.get("/", (req, res) => {
  res.send("welcome to the project")
})

router.post("/register", async (req, res) => {
  let {name, email, password} = req.body
  try {
    const validateUser = await User.findOne({email: req.body.email})
    console.log(validateUser)
    if(validateUser) return res.status(400).json({status: "Failed", message: "User already exist"})

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password})

    res.status(201).json({
      status: "Successful",
      user: {user: user.name, email: user.email}
    })
  }catch(err){
    res.status(400).json({
      status: "Fail",
      message: err.message
    })
  }
})


module.exports = router
