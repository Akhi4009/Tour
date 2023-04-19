const User = require("../model/usermodel")
const catchAsync = require("../utlits/catchAsync")
const APIFeatures=require("../utlits/apiFeature")

const getUser= catchAsync (async(req,res,next)=>{
    const features=new APIFeatures(User.find(),req.query).filter().sort().LimitFields().Pagination()

    const users=await features.query
        res.status(200).send({status:true,result:users.length,data:users})
  
        })
  module.exports ={getUser}