const User =require("../model/usermodel")
require('dotenv').config()
const jwt=require("jsonwebtoken")
const AppError = require("../utlits/appError")

const catchAsync=require("../utlits/catchAsync")

const signToken= id =>{
    return jwt.sign({id},process.env.jwt_secret,{
        expiresIn:process.env.jwt_expires
    })
}

exports.signup=catchAsync(async(req,res,next)=>{
    const {name,email,password,passwordConfirm}=req.body
    const newUser=await User.create({
        name,
        email,
        password,
        passwordConfirm
    });
    

    const token=signToken(newUser._id)
    res.status(200).send({
        stats:"success",
       token,
        data:{
            user:newUser
        }
    })

})

exports.logIn = catchAsync(async(req,res,next)=>{

// check if email and password exist
    const {email,password} = req.body;
    if(!email || !password){
        return next( new AppError('Please provide email and password',400));

    }

    //check if user exist && password is correct
    const user = await User.findOne({email}).select('+password');
    // console.log(user)
    const correct=await user.correctPassword(password,user.password)
    // console.log(correct)

    if(!user || !(await user.correctPassword(password,user.password) )){

        return next(new AppError('Incorrect email or password',401))
    }
   const token=signToken(user._id)
    //everything ok
    res.status(200).send({
        status:"Success",
        token
    })
    
})