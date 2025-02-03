const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  images: { type: Array },
  model: { type: String },
  category: { type: String },
  sizes: { type: Array },
  price: {type: String}
  description: { type: String },
  dateCreated: { type: String },
  color: { type: String }
});

const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;
