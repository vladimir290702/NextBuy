const mongoose = require("mongoose");

const listingsSchema = new mongoose.Schema({
  productName: { type: String },
  images: { type: Array },
  model: { type: String },
  description: { type: String },
  parentCategory: { type: String },
  category: { type: String },
  sizes: { type: Array },
  price: { type: Number },
  date: { type: String },
  color: { type: String },
  gender: { type: String },
  totalViews: { type: Number },
});

const Listings = mongoose.model("Listings", listingsSchema);
module.exports = Listings;
