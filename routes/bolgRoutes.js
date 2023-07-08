const express = require("express");
const { getallblogscontroller, 
    createblogcontroller, 
    updateblogcontroller, 
    deleteblogcontroller, 
    getblogbyidcontroller,
    userblogcontroller,
    viewblogcontroller, } = require("../controller/blogController");

//router object

const router = express.Router();



//routes

router.post("/create-blog", createblogcontroller)

router.get("/all-blogs", getallblogscontroller)

router.put("/update-blog/:id",updateblogcontroller )

router.put("/update-blogview/:id",viewblogcontroller )

router.get("/get-blog/:id", getblogbyidcontroller)

router.delete("/delete/:id", deleteblogcontroller)

router.get("/user-blog/:id",userblogcontroller)



module.exports= router;