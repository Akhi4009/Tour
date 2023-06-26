const express=require('express')
const router=express.Router()
const Tour=require("../model/tourmodel")

const {getTour,createTour,updateTour,deleteTour,aliasTopTours,getTourStats,getTourMonthly, getTourByID}=require("../controller/tourController")
const {protect,restrictTo} = require("../controller/authController")

router.route("/plan-monthly/:year",getTourMonthly)
router.route("/top-5-cheap")
.get(aliasTopTours,getTour)

router.route("/tour-stats")
.get(getTourStats)


router.route("/")
.get(protect,restrictTo('admin','lead-guide','user'), getTour)
.post( createTour)

router.route("/:id")
.get(protect,getTourByID)
.patch(protect,restrictTo('admin'),updateTour)
.delete(protect,restrictTo('admin'),deleteTour)



module.exports=router