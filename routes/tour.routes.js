const express=require('express')
const router=express.Router()
const Tour=require("../model/tourmodel")

const {getTour,createTour,updateTour,deleteTour,aliasTopTours,getTourStats,getTourMonthly, getTourByID}=require("../controller/tourController")


router.route("/plan-monthly/:year",getTourMonthly)
router.route("/top-5-cheap")
.get(aliasTopTours,getTour)

router.route("/tour-stats")
.get(getTourStats)


router.route("/")
.get( getTour)
.post( createTour)

router.route("/:id")
.get(getTourByID)
.patch( updateTour)
.delete( deleteTour)



module.exports=router