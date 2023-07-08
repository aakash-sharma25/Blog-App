const express = require("express")
require("dotenv").config();
const path = require("path")
const cors = require("cors")
const morgan = require("morgan");

const connectdb = require("./config/database");

const app=express();

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "./client/buil")))

app.get( "*" , (req,res) =>{
    res.sendFile(path.join(__dirname , "./client/build/index.html"))
});
//mongodb connection

connectdb();

//routes import

const userRoutes =require("./routes/userRoute")
const blogRoutes =require("./routes/bolgRoutes")


//routes
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/blog",blogRoutes);



const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`blog server running on ${process.env.DEV_MODE} mode on port ${PORT}`);
})