const express=require('express')
const router=express.Router()
const User=require("../model/usermodel")

const {signup,logIn,protect,restrictTo,forgetPassword,resetPassword, updatePassword} = require("../controller/authController")
const {getUser} = require("../controller/userController")

router.post("/signup",signup)
router.post("/login",logIn)
router.post("/forgetpassword",forgetPassword)
router.patch("/resetpassword/:token",resetPassword)
router.patch("/updatepassword",protect, updatePassword)


router.route("/")
.get(protect,getUser)
module.exports=router