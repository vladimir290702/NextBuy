const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing", // 👈 This should match your model name for products
  },
  lastMessage: String,
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Conversation", conversationSchema);
