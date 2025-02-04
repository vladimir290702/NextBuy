const mongoose = require("mongoose");

const listingsSchema = new mongoose.Schema({
  images: { type: Array },
  model: { type: String },
  description: { type: String },
  category: { type: String },
  sizes: { type: Array },
  price: { type: String },
  date: { type: String },
  color: { type: String },
  gender: { type: String },
});

const Listings = mongoose.model("Listings", listingsSchema);
module.exports = Listings;
