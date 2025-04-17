const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const connectDB = async()=>{
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected Successfully");
    }   
    catch(error){
        console.log(error.message)
    }
}

module.exports = connectDB;
