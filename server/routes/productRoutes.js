const router = require("express").Router()
const Products = require("../models/productModel")
// const upload = require("../config/multer")
const cloudinary = require("../config/cloudinaryConfig")
const fs = require('fs');

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
// upload.single("image"),
router.post('/upload', async (req, res) => {
let { name, type, amount, image } = req.body;
console.log(req.body)
try {
  if (image) {
    const uploadedResponse = await cloudinary.uploader.upload(image, {
      upload_preset: "online-shop",
    });

    if (uploadedResponse) {
      const product = new Products({
        name,
        brand,
        desc,
        price,
        image: uploadedResponse,
      });

      const savedProduct = await product.save();
      res.status(200).send(savedProduct);
    }
  }
} catch (error) {
  console.log(error);
  res.status(500).send(error.message);
}


})

module.exports = router
