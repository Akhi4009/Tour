const express=require('express')
const multer = require('multer');
const User=require("../model/usermodel")

const {
    signup,logIn,protect,
    restrictTo,forgetPassword,
    resetPassword, updatePassword
    } = require("../controller/authController")

const {
    getUser,updateMe,deleteMe,
     deleteUser, updateUser, 
     userDetails,getMe, uploadUserPhoto,
     resizeUserPhoto,
    } = require("../controller/userController")



const router=express.Router()

router.post("/signup",signup)
router.post("/login",logIn)
router.post("/forgetpassword",forgetPassword)
router.patch("/resetpassword/:token",resetPassword)

router.use(protect)
router.get("/me",getMe,userDetails);
router.patch("/updatepassword", updatePassword);
router.patch("/updateme", uploadUserPhoto, resizeUserPhoto, updateMe);

router.delete("/deleteme", deleteMe);

//midleware
router.use(restrictTo('admin','user'))


router.route("/")
.get(getUser)
router.route("/:id")
.delete(deleteUser)
.patch(updateUser)
.get(userDetails)


module.exports=router