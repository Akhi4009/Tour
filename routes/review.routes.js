const express=require("express")


const Review=require("../model/reviewmodel")
const {getAllReviews,createReview, deleteReview, updateReview, getReviewDetails,setTourUserIds}=require("../controller/reviewController")
const {protect,restrictTo}=require("../controller/authController")
const router=express.Router({mergeParams:true})

router.use(protect)

router.route("/")
.get(getAllReviews)
.post(restrictTo('user'),setTourUserIds,createReview)

router.route("/:id")
.delete(restrictTo("admin","user"),deleteReview)
.patch(restrictTo("admin","user"),updateReview)
.get(getReviewDetails)


module.exports=router