const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose
      .connect(
        `mongodb+srv://vladimirmetodiev2907:nextbuy@nextbuy.b6hrk.mongodb.net/testdb?retryWrites=true&w=majority&appName=NextBuy`
      )
      .then(() => console.log("Connected to MongoDB Atlas"))
      .catch((err) => console.error("Error connecting to MongoDB Atlas", err));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
