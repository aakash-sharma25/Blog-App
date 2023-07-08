const mongoose =require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is required"]
    },
    decreption:{
        type:String,
        required:[true,"decreption is required"],
    },
    image:{
        type:String,
        required:[true,"image is required"]
    },
    views:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"user id nahi hai"]
    }
},{timestamps:true});

const blogmodel = mongoose.model("Blog",blogSchema);

module.exports = blogmodel;