const usermodel =require("../model/usermodel")
const bcrypt = require("bcrypt")


exports.registerController =async (req,res) => {
try {
    const {username , email ,password }=req.body;

    if(!username || !email || !password){
        return res.status(500).json({
            sucess:false,
            message:"enter full detail"
        })
    }
    const existuser = await usermodel.findOne({email});

    if(existuser){
        return res.status(401).json({
            sucess:false,
            message:"user already exist"
        })
    }

    const hassedpassword = await bcrypt.hash(password,10)
    // password=hassedpassword;
    const user = await new usermodel({username , email ,password:hassedpassword }).save();
    return res.status(200).json({
        sucess:true,
        message:"user created sucessfully ",
        user,
    })


    
} catch (error) {
    console.log(error);
    return res.status(500).json({
        sucess:false,
        message:"error in register user"
    })
}

}

exports.getAllUsers = async (req,res) => {
    try {
        const alluser =await usermodel.find({});
        return res.status(200).json({
            sucess:true,
            message:"all user fetched sucessfull",
            userlength:alluser.length,
            alluser
        })

    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucess:false,
            message:"error in register user"
        })
    }
}


exports.loginController = async  (req,res) => {
    try {

        const {email,password}= req.body;

        if(!email || !password){
            return res.status(500).json({
                sucess:false,
                message:"enter full detail"
            })
        }

        const user = await usermodel.findOne({email});

        if(!user){
            return res.status(200).json({
                sucess:false,
                message:"not a registered user please login"
            })
        }

        const ismatch = await bcrypt.compare(password , user.password);
            console.log(password,user.password);
            console.log(ismatch);
        if(!ismatch){
            return res.status(401).json({
                sucess:false,
                message:"invalid username or password",
                password,
            })
        }
      
        return res.status(200).json({
                sucess:true,
                message:"user logged in sucessfully",
                user,
            })

    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucess:false,
            message:"error in register user"
        })
    }

}
