const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  quantity: Number,
  section: String,
  price: Number,
  description: String,
  image: String,
  section: String
});

module.exports = mongoose.model("Product", productSchema);