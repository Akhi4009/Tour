const express=require('express')
const router=express.Router()
const Tour=require("../model/tourmodel")

const {getTour,createTour,updateTour,deleteTour,aliasTopTours,getTourStats,getTourMonthly, getTourByID}=require("../controller/tourController")
const {protect,restrictTo} = require("../controller/authController")

router.route("/plan-monthly/:year",protect,restrictTo("admin","lead-guide","guide"),getTourMonthly)
router.route("/top-5-cheap")
.get(aliasTopTours,getTour)

router.route("/tour-stats")
.get(getTourStats)


router.route("/")
.get( getTour)
.post(protect,restrictTo("admin","lead-guide"), createTour)

router.route("/:id")
.get(getTourByID)
.patch(protect,restrictTo('admin','lead-guide'),updateTour)
.delete(protect,restrictTo('admin','lead-guide'),deleteTour)



module.exports=router