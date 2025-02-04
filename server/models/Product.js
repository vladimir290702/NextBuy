const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  images: { type: Array },
  model: { type: String },
  category: { type: String },
  sizes: { type: Array },
  price: {type: String}
  description: { type: String },
  dateCreated: { type: String },
  color: { type: String }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
