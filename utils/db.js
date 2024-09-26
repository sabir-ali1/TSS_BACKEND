const mongoose = require("mongoose");

const URL = process.env.mongo_url

const connectDb = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("error from connectdb");
    }
}

module.exports = connectDb