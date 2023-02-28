const express=require('express')
const router=express.Router()
const Tour=require("../model/tourmodel")

const {getTour,createTour,updateTour,deleteTour,aliasTopTours,getTourStats,getTourMonthly}=require("../controller/tourController")


router.route("/plan-monthly/:year",getTourMonthly)
router.route("/top-5-cheap")
.get(aliasTopTours,getTour)

router.route("/tour-stats")
.get(getTourStats)


router.route("/")
.get( getTour)
.post( createTour)

router.route("/:id")
.patch( updateTour)
.delete( deleteTour)



module.exports=router