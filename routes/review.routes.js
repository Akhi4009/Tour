const express=require("express")

const router=express.Router()
const Review=require("../model/reviewmodel")
const {getAllReviews,createReview}=require("../controller/reviewController")
const {protect,restrictTo}=require("../controller/authController")

router.get("/allReview",getAllReviews)
router.post("/createReview",protect,restrictTo('admin'),createReview)


module.exports=router