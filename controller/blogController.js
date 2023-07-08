const mongoose = require("mongoose")
const blogModel = require("../model/blogModel");

const userModel = require("../model/usermodel");


exports.getallblogscontroller = async (req, res) => {

    try {
        const blogs = (await blogModel.find({}).populate("user")).reverse();

        if (!blogs) {
            return res.status(200).json({
                sucess: false,
                message: "no blogs",
            })
        }
        return res.status(200).json({
            sucess: true,
            message: "all blogs",
            count: blogs.length,
            blogs,

        })

    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "error in gettin all blogs",
            error,
        })
    }
}

exports.createblogcontroller = async (req, res) => {

    try {

        const { title , image , decreption , user } = req.body;

        if (!title || !image || !decreption || !user) {
            return res.status(500).json({
                sucess: false,
                message: "fill all details",
            })
        }

        const existinguser = await userModel.findById(user);

        if(!existinguser){
            return res.status(400).json({
                sucess: false,
                message: "not a existing user not found",
            })
        }

        const newBlog = new blogModel({ title, image, decreption, user});

        const session = await mongoose.startSession()

        session.startTransaction()

        await newBlog.save({session})

        existinguser.blogs.unshift(newBlog)

        await existinguser.save({session})

        await session.commitTransaction();

        await newBlog.save();

        return res.status(200).json({
            sucess: true,
            message: "new blog saved successfully",
            newBlog,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucess: false,
            message: "error in creating new blog",
            error,
        })
    }

}

exports.updateblogcontroller = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, decreption, image } = req.body;
        const updateblog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({
            sucess: true,
            message: "blog update sucessfully",
            updateblog,
        })

    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "error in updating  blogs",
            error,
        })
    }

}

exports.getblogbyidcontroller = async (req, res) => {
    try {
        const { id } = req.params;
        const singleblog = await blogModel.findById(id);
        console.log(singleblog);

        if (!singleblog) {
            return res.status(500).json({
                sucess: false,
                message: "error in gettin single blog",
            })
        }

        return res.status(200).json({
            sucess: true,
            message: "blog found sucessfully by id",
            singleblog,
        })

    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "error in gettin single blog",
            error,
        })
    }

}

exports.deleteblogcontroller = async (req, res) => {
    try {

        const { id } = req.params;

        const deleteblog = await blogModel.findByIdAndDelete(id).populate("user")
        await deleteblog.user.blogs.pull(deleteblog)

        await deleteblog.user.save();

        return res.status(200).json({
            sucess: true,
            message: "blog deleted sucessfully",
            deleteblog,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucess: false,
            message: "error in deleting  blog",
            error,
        })
    }

}

exports.userblogcontroller = async (req,res) =>{
    try {

        const {id} =req.params;

        const userblog = await userModel.findById(id).populate("blogs");

        if(!userblog){
            return res.status(400).json({
                sucess: false,
                message: "no blogs",
            })
        }

        return res.status(200).json({
            sucess: true,
            message: "all blogs are fetched"+ userblog.length,
            noOfblogs:userblog.blogs.length,
            userblog,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            sucess: false,
            message: "error in fetching user  blog",
            error,
        })
    }
}

exports.viewblogcontroller = async (req,res) =>{

    try {
        const { id } = req.params;
        // const { title, decreption, image } = req.body;
        const updateblog = await blogModel.findOneAndUpdate({_id:id}, { $inc: { views: 1 }} ,{new: true });
       
        return res.status(200).json({
            sucess: true,
            message: "blog view update sucessfully",
            updateblog,
        })

    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "error in updating  blogs",
            error,
        })
    }

}