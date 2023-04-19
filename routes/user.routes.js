const express=require('express')
const router=express.Router()
const User=require("../model/usermodel")

const {signup,logIn} = require("../controller/authController")
const {getUser} = require("../controller/userController")

router.post("/signup",signup)
router.post("/login",logIn)


router.route("/")
.get(getUser)
module.exports=router