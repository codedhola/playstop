const router = require("express").Router()
const Products = require("../models/productModel")
require("../config/cloudinaryConfig");
const upload = require("../config/multer")
const sdk = require('api')('@fincra-api/v1.0#1nakcfep1ll988yi92');

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

// GET PRODUCT
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try{
    const products = await Products.findById(id)

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

// CHECKOUT SESSION
router.post("/checkout", async (req, res) => {

  const id = req.query.id
  console.log(id)
  sdk.createTemporaryVirtualAccount({expiresAt: '30', amount: '900'})
    .then(({ data }) => console.log(data))
    .catch(err => console.error(err));
  res.status(200).json({
    success: "success",
    message: id
  })
})

module.exports = router

