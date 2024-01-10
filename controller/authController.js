const User =require("../model/usermodel")
const crypto=require("crypto")
const {promisify} = require("util")
require('dotenv').config()
const jwt=require("jsonwebtoken")
const AppError = require("../utlits/appError")
const sendEmail=require("../utlits/email")

const catchAsync=require("../utlits/catchAsync")

const signToken= id =>{
   
    return jwt.sign({id},process.env.jwt_secret,{
        expiresIn:process.env.jwt_expires
    })
}

exports.signup=catchAsync(async(req,res,next)=>{
    const {name,email,password,passwordConfirm,role}=req.body
    const newUser=await User.create({
        name,
        email,
        password,
        passwordConfirm,
        role
    });
    

    const token=signToken(newUser._id)
    res.status(200).json({
        status:"success",
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
    
    // console.log(correct)

    if(!user || !(await user.correctPassword(password,user.password) )){

        return next(new AppError('Incorrect email or password',401))
    }
   const token=signToken(user._id)
    //everything ok
    res.status(200).send({
        status:"Success",
        token,
        user
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
    
   if(freshUser.changedPassword(decoded.iat)){

    return next(new AppError('User recently changed password! Please log in again',401))

   }

   req.user=freshUser;


   next()
})

exports.restrictTo = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new AppError('You do not have permision to perform this action',403))
        }
        next()
    }

}

exports.forgetPassword=catchAsync(async(req,res,next)=>{

    //get user based on posted email
    const user=await User.findOne({email:req.body.email})
    if(!user){
        return next(new AppError('There is no user with this email',404))
    }

    //generate the random reset token
    const resetToken=user.createPasswordResetToken()
   
    
    await user.save({validateBeforeSave:false})


    // send it to users email
    const resetURL= `${req.protocol}://${req.get('host')}/users/resetpassword/${resetToken}`

    const message= `Forget your password? Submit a patch request with your new password and passwordConfirm to:
     ${resetURL}.\n if you did not forget your password, please ignore this email.`;

try{
    await sendEmail({
        email:user.email,
        subject:'Your password reset token (valid for 10 min)',
        message
     })

     res.status(200).json({
        status:"success",
        "message":"Token sent to email!"
     })
}catch(err){
    user.passwordResetToken=undefined;
    user.passwordResetExpires=undefined
    await user.save({validateBeforeSave:false})
    console.log(err)
    return next(new AppError('There was an error sending the email. try again letter',500))

}
    
   

})

exports.resetPassword=catchAsync(async(req,res,next)=>{

    //get user based on the token
    const hashedToken=crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')
    console.log(hashedToken)

    const user= await User.findOne({
        passwordResetToken:hashedToken,
        passwordResetExpires:{$gt: Date.now()}
    })

    // if user has not expired, and there is user , set new password

    if(!user){
        return next(new AppError('token is unvalid or has expired',400))
    }

    user.password=req.body.password
    user.passwordConfirm=req.body.passwordConfirm
    user.passwordResetToken=undefined
    user.passwordResetExpires=undefined
    
    await user.save()

    //update changed password property for the user

    // log the user in send jwt
    const token=signToken(user._id)
    //everything ok
    res.status(200).send({
        status:"Success",
        token
    })
})

exports.updatePassword=catchAsync(async(req,res,next)=>{

    //get user from collection
    
    const user= await User.findOne({id:req.user._id}).select('+password')

    
    //check if posted current password is correct

    if(! (await user.correctPassword(req.body.passwordcurrent,user.password))){
        return next(new AppError('Your current password is wrong.',401))
    }

    //if so, update password
    user.password=req.body.password;
    user.passwordConfirm=req.body.passwordConfirm;

    await user.save()

    const token=signToken(user._id)
    //everything ok
    res.status(200).send({
        status:"Success",
        token
    })


})