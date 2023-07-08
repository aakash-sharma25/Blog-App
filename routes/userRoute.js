const express = require("express");
const { getAllUsers, registerController, loginController } = require("../controller/userController");

//router object

const router = express.Router();

//routes


router.post("/register",registerController)
router.post("/login",loginController)

router.get("/all-users", getAllUsers)


module.exports= router;