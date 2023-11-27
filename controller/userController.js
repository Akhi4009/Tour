const User = require("../model/usermodel")
const catchAsync = require("../utlits/catchAsync")
const APIFeatures=require("../utlits/apiFeature")
const AppError =require("../utlits/appError")
const factory=require("../controller/handlerFactory")

const filteredObj=(obj,...allowedfields)=>{
   
    const newObj={}
    Object.keys(obj).forEach(ele=>{
        if(allowedfields.includes(ele)){
            newObj[ele]=obj[ele]
        }
    })
    return newObj
}

const getMe=(req,res,next)=>{

    req.params.id=req.user.id
    next()
}

const updateMe=catchAsync(async(req,res,next)=>{

    // create error if user posts password data
    if(req.body.passwprd || req.body.passwordConfirm){
        return next(AppError('This route is not for password updates. please use /updatepassword.',400))

    }

    // update user document
    
    const filteredBody=filteredObj(req.body,'name','email')
    
    const updatedUser=await User.findByIdAndUpdate(req.user.id,filteredBody,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        status:"success",
        user:updatedUser

    })
})

const deleteMe=catchAsync(async(req,res,next)=>{

    await User.findByIdAndUpdate(req.user.id,{active:false})

    res.status(200).json({
        status:"success",
        data:null
    })

})

// for admin

const getUser=factory.getAll(User)

// Do not update password with this
const updateUser=factory.updateOne(User)
const userDetails=factory.getOne(User)
const deleteUser=factory.deleteOne(User)



  module.exports ={getUser,updateMe,deleteMe,deleteUser,updateUser,userDetails,getMe}