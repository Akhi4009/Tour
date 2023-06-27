const express=require('express')
const router=express.Router()
const User=require("../model/usermodel")

const {signup,logIn,protect,restrictTo,forgetPassword,resetPassword, updatePassword} = require("../controller/authController")
const {getUser,updateMe,deleteMe, deleteUser, updateUser, userDetails} = require("../controller/userController")

router.post("/signup",signup)
router.post("/login",logIn)
router.post("/forgetpassword",forgetPassword)
router.patch("/resetpassword/:token",resetPassword)
router.patch("/updatepassword",protect, updatePassword)
router.patch("/updateme",protect, updateMe)
router.delete("/deleteme",protect, deleteMe)


router.route("/")
.get(protect,restrictTo('admin'),getUser)
router.route("/:id")
.delete(protect,restrictTo("admin"),deleteUser)
.patch(protect,restrictTo("admin"),updateUser)
.get(protect,restrictTo("admin"),userDetails)


module.exports=router