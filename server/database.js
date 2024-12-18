const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`mongodb+srv://vladimirmetodiev2907:nextbuy@nextbuy.b6hrk.mongodb.net/?retryWrites=true&w=majority&appName=NextBuy`)
        console.log(`MongoDB Connected: ${connection.connection.host}`);
        
    } catch (error) {
        console.error(error);
        process.exit(1);
        
    }
};

module.exports = connectDB