const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Databse Connected");

    } catch (error) {
        console.log("Connection error, ", error.message);
        process.exit(1)
    }
}

module.exports = connectDB