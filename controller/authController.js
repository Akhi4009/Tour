const User =require("../model/usermodel")
const {promisify} = require("util")
require('dotenv').config()
const jwt=require("jsonwebtoken")
const AppError = require("../utlits/appError")

const catchAsync=require("../utlits/catchAsync")

const signToken= id =>{
    console.log(process.env.jwt_expires);
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

exports.protect=catchAsync(async(req,res,next)=>{

    // getting token and check of it's there
    let token
    // console.log(req.headers)
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1]
        // console.log(token);
    }

    if(!token){
        return next( new AppError('You are not logged in! please log in to get access',401))
    }

    // verification token
   
   
    const decoded=await promisify(jwt.verify)(token,process.env.jwt_secret)

   // check if user still exist
    const freshUser=await User.findById(decoded.id)

    if (!freshUser){
        return next(new AppError("The user belonging to this token does no longer exist"))
    };

    // check if user changed password after the token was issued
    
   
   next()
})