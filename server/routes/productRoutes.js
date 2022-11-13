const router = require("express").Router()
const Products = require("../models/productModel")
//const multerUploads = require("../config/multer")
router.get("/", async (req, res) => {
  try{
    const products = await Products.find()

    res.status(200).json({
      status: "Successful",
      products
    });
  }catch(err){
    res.status(400).json({
      status: "Failed",
      err
    })
  }
})

router.post("/", async(req, res) => {
  const { name, type, image, amount } = req.body
  try {
    const product = await Products.create({name, type, image, amount})

    res.status(201).json({
      status: "Successful",
      product
    })
    }catch(err){
      res.status(400).json({
        status: "Failed",
        err
      })
  }
})

router.post('/upload', (req, res) => {
  console.log('req.body :', req.body);
  res.send("success")
})

module.exports = router
