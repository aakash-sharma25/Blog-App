const mongoose = require("mongoose");
require("dotenv").config();

const connectdb = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log(`connected to database blog-app-full`);
    } catch (error) {
        console.log("error in database connection blog-app-full" + error);
        
    }
}

module.exports = connectdb;
