const multer = require("multer");
const User = require("../model/usermodel");
const catchAsync = require("../utlits/catchAsync");
const APIFeatures=require("../utlits/apiFeature");
const AppError =require("../utlits/appError");
const factory=require("../controller/handlerFactory");


const multerStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'client/src/img/users');
    },
    filename:(req,file,cb)=>{
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
    }
}
)

const multerFilter = (req,file,cb)=>{
if(file.mimetype.startsWith('image')){
    cb(null,true)
}else{
    cb(new AppError('Not an image! Please upload only images.',400),false)
}
};

const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter
})
const uploadUserPhoto = upload.single('photo');

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

    // console.log(req.file);
    console.log(req.body);
    
    // create error if user posts password data
    if(req.body.passwprd || req.body.passwordConfirm){
        return next(AppError('This route is not for password updates. please use /updatepassword.',400))
     }

    // update user document
    
    const filteredBody=filteredObj(req.body,'name','email');
    if(req.file) filteredBody.photo =req.file.filename;
//    console.log(req.file.filename)
    // console.log(filteredBody);
    // console.log(filteredBody)
    
    const updatedUser = await User.findByIdAndUpdate(req.user.id,filteredBody,{
        new:true,
        runValidators:true
    });
    // console.log(updatedUser);
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



  module.exports ={getUser,updateMe,deleteMe,deleteUser,updateUser,userDetails,getMe,uploadUserPhoto}