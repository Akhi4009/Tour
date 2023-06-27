const express=require("express")

const router=express.Router()
const Review=require("../model/reviewmodel")
const {getAllReviews,createReview, deleteReview, updateReview, getReviewDetails}=require("../controller/reviewController")
const {protect,restrictTo}=require("../controller/authController")


router.use(protect)


router.get("/allReview",getAllReviews)
router.post("/create",restrictTo('user'),createReview)

router.route("/:id")
.delete(restrictTo("admin","user"),deleteReview)
.patch(restrictTo("admin","user"),updateReview)
.get(getReviewDetails)


module.exports=router