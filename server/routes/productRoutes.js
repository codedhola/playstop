const router = require("express").Router()
const Products = require("../models/productModel")
require("../config/cloudinaryConfig");
const upload = require("../config/multer")

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

// upload.single("image"),
router.post('/upload', upload.single("image"), async (req, res) => {
    let { name, price, description } = req.body
    try {
      let createdProduct = await new Products({
        name,
        price,
        description,
        image: req.file.path
      })
    createdProduct.save()

    res.status(201).json({
      message: "Product added successfully"
      })
    }catch (err) {
    res.status(500).json({
      message: err.message,
    });
    }
})

module.exports = router
