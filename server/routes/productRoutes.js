const router = require("express").Router()
const Products = require("../models/productModel")
const { Fincra } = require('fincra-node-sdk');
require("../config/cloudinaryConfig");
const upload = require("../config/multer")
const data = require("../utils/virtualAccount")


const fincra = new Fincra(process.env.PUBLIC_KEY, process.env.PRIVATE_KEY, { sandbox: true });

async function createVirtual(){
  try{
    const createVirtual = await fincra.virtualAccount.createVirtualAccount(data);

  }catch(err){
    console.log(err)
  }
}
createVirtual()

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


  res.status(200).json({
    success: true,
    message: "Transaction in progress"
  })
})

module.exports = router

