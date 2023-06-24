const express=require("express")

const router=express.Router()
const Review=require("../model/reviewmodel")
const {getAllReviews,createReview}=require("../controller/reviewController")
const {protect,restrictTo}=require("../controller/authController")

router.get("/allReview",getAllReviews)
router.post("/create",protect,restrictTo('user'),createReview)


module.exports=router