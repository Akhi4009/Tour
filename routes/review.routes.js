const express=require("express")

const router=express.Router()
const Review=require("../model/reviewmodel")
const {getAllReviews,createReview, deleteReview, updateReview}=require("../controller/reviewController")
const {protect,restrictTo}=require("../controller/authController")


router.get("/allReview",getAllReviews)
router.post("/create",protect,restrictTo('user'),createReview)

router.route("/:id")
.delete(protect,deleteReview)
.patch(protect,updateReview)


module.exports=router