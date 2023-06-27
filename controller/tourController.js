
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



const createTour=catchAsync( async(req,res,next)=>{
    
        const tour=new Tour(req.body)
        await tour.save()
        res.status(201).send({
            status:'success',
            data:{
                tour
            }
        })
  
    })

   

const getTour= catchAsync (async(req,res,next)=>{
    
  //execution
      const features=new APIFeatures(Tour.find(),req.query).filter().sort().LimitFields().Pagination()

    const tours=await features.query
        res.status(200).send({status:true,result:tours.length,data:tours})
        
  
   
})



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

const getTourByID=catchAsync(async(req,res,next)=>{

    const tour=await Tour.findById(req.params.id).populate("reviews")

    if(!tour){
        return next(new AppError('No tour found by that id',404))
    }
    res.status(200).send({
        status:'success',
        data:tour
    })

})

const updateTour=factory.updateOne(Tour)

// const updateTour=catchAsync(async(req,res,next)=>{
//     const Id=req.params.id
//     const payload=req.body
//    const tour= await Tour.findByIdAndUpdate({_id:Id},payload)
//    if(!tour){
//     return next(new AppError('No tour foun by that id',404))
// }
//     res.status(200).send("updated")
   
// })


const deleteTour= factory.deleteOne(Tour)

// const deleteTour=catchAsync(async(req,res)=>{
//     const Id=req.params.id
//    const tour= await Tour.findByIdAndDelete({_id:Id})

//    if(!tour){
//     returnext(new AppError("No tour found with this ID",404));
//    }


//     res.status(204).json({
//       status:"success",
//       data:null
//     })
// })


module.exports={getTour,createTour,updateTour,deleteTour,aliasTopTours,getTourStats,getTourMonthly,getTourByID}
