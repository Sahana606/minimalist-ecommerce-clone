const express = require("express");
const router = express.Router();
const multer = require("multer");
const AddProduct = require("../models/addproduct");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });


router.post("/add-product", upload.single("image"), async (req, res) => {
  try {
    const product = new AddProduct({
      name: req.body.name,
      category: req.body.category,
      quantity: req.body.quantity,
      price: req.body.price,
      section: req.body.section,
      description: req.body.description,
      image: req.file ? req.file.filename : ""
    });

    await product.save();
    res.json({ message: "Product added successfully" });

  } catch (err) {
    res.status(500).json({ error: "Error adding product" });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await AddProduct.find();
    res.json(products);
  } catch {
    res.status(500).json({ error: "Error fetching products" });
  }
});


router.get("/product/:id", async (req, res) => {
  try {
    const product = await AddProduct.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Invalid ID or server error" });
  }
});


router.put("/update-product/:id", upload.single("image"), async (req, res) => {
  try {
    const updatedData = {
      name: req.body.name,
      category: req.body.category,
      quantity: req.body.quantity,
      price: req.body.price,
      section: req.body.section,
      description: req.body.description,
    };

    
    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedProduct = await AddProduct.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product updated", updatedProduct });

  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});


router.delete("/delete-product/:id", async (req, res) => {
  try {
    await AddProduct.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;