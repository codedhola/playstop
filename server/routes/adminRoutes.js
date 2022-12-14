const router = require("express").Router()
const User = require("../models/adminModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const signToken = async (id) => {
    return jwt.sign({id: id}, process.env.JWT_SECRET)
}



router.get("/", (req, res) => {
  res.send("welcome to the project")
})

router.post("/register", async (req, res) => {
  let {name, email, password} = req.body
  try {
    const validateUser = await User.findOne({email: req.body.email})
    if(validateUser) return res.status(400).json({status: "Failed", message: "User already exist"})

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password})
    const token = await signToken(user._id)

    res.status(201).json({
      status: "Successful",
      user: {user: user.name, email: user.email},
      token: token
    })
  }catch(err){
    res.status(400).json({
      status: "Fail",
      message: err.message
    })
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  if(!email || !password) return res.status(400).json({status: "Failed", message: "email and password needed"})
  try{
    const user = await User.findOne({email: email}).select("+password")
    const validate = await bcrypt.compare(password, user.password)
    if(!validate) return res.status(404).json({status: "Failed", message: "username or password not correct"})

    const token = await signToken(user.id)

    res.status(200).json({
      status: "Successful",
      message: {user: user.name, email: user.email},
      token: token
    })
  }catch(err){
    res.status(400).json({
      status: "Failed",
      err: err.message
    })
  }
})

module.exports = router
