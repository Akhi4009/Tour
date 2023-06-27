
const Tour = require('../model/tourmodel')
const APIFeatures = require("../utlits/apiFeature")
const catchAsync = require("../utlits/catchAsync")
const AppError = require("../utlits/appError")
const factory=require("../controller/handlerFactory")
const { Model } = require('mongoose')




const aliasTopTours=(req,res,next)=>{
    req.query.limit='5',
    req.query.sort='-ratingsAverage,price'
    req.query.fields="name,price,ratingsAverage,difficulty";
    next()
}

const getTourStats=catchAsync(async(req,res,next)=>{

   
        const stats=await Tour.aggregate([
            {$match:{ratingsAverage:{$gte:4.5}}},

            {$group:{
                _id:{$toUpper: '$difficulty'},
                numTours:{$sum:1},
                numRating:{$sum:'$ratingsQuantity'},
                avgRating:{$avg: '$ratingsAverage'},
                avgPrice:{$avg: '$price'},
                minPrice:{$min: '$price'},
                maxPrice:{$max: '$price'}
            }},
            {
                $sort:{avgPrice:1}
            }
            
        ])

        res.send({
            status:true,
            result:stats.length,
            data:stats})

        })

const getTourMonthly=async(req,res,next)=>{
try{
  
}catch(err){
    res.status(404).send(err.message)
}
}

const getTour=factory.getAll(Tour)
const createTour=factory.createOne(Tour)
const getTourByID=factory.getOne(Tour,{path:"reviews"})
const updateTour=factory.updateOne(Tour)
const deleteTour= factory.deleteOne(Tour)




module.exports={getTour,createTour,updateTour,deleteTour,aliasTopTours,getTourStats,getTourMonthly,getTourByID}
