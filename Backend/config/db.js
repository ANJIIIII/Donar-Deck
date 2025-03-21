const mongoose=require('mongoose')
// const colors=require('colors')
require("dotenv").config();

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongodb database ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`mongodb db error ${error}`);
        process.exit(1);
    }
};
module.exports = connectDB;