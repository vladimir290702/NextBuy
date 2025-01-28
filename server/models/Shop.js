const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  logo: { type: String },
  name: { type: String, required: true },
  categories: { type: Array, required: true },
  listings: { type: Array },
});

const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;
