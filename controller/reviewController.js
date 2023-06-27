const Review=require("../model/reviewmodel")
const catchAsync=require("../utlits/catchAsync")
const factory=require("../controller/handlerFactory")


exports.getAllReviews=catchAsync(async(req,res,next)=>{
    const review=await Review.find()

    res.status(200).json({
        status:'success',
        results:review.length,
        data:{
            review
 }
        
    })
})

exports.createReview=catchAsync(async(req,res,next)=>{

    const newReview=await Review.create(req.body);

    res.status(201).json({
        status:'success',
        data:{
            review:newReview
        }
    })
})


exports.deleteReview=factory.deleteOne(Review)


exports.updateReview=factory.updateOne(Review)