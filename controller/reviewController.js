const Review=require("../model/reviewmodel")
// const catchAsync=require("../utlits/catchAsync")
const factory=require("../controller/handlerFactory")




exports.getAllReviews=factory.getAll(Review)
exports.createReview=factory.createOne(Review)
exports.deleteReview=factory.deleteOne(Review)
exports.updateReview=factory.updateOne(Review)
exports.getReviewDetails=factory.getOne(Review)