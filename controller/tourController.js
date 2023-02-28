
const Tour=require('../model/tourmodel')
const APIFeatures=require("../utlits/apiFeature")



const aliasTopTours=(req,res,next)=>{
    req.query.limit='5',
    req.query.sort='-ratingsAverage,price'
    req.query.fields="name,price,ratingsAverage,difficulty";
    next()
}

const createTour=async(req,res)=>{
    try{
        const tour=new Tour(req.body)
        await tour.save()
        res.send("data added")
    }catch(err){
        console.log(err)
    }
    }

   

const getTour=async(req,res)=>{
    try{
  //execution
      const features=new APIFeatures(Tour.find(),req.query).filter().sort().LimitFields().Pagination()

    const tours=await features.query
        res.send({status:true,result:tours.length,data:tours})
        
  
   }catch(err){
res.status(404).send(err.message)
   }
}

const getTourStats=async(req,res)=>{

    try{
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

    }catch(err){
        res.status(404).send(err.message)
    }
}

const getTourMonthly=async(req,res)=>{
try{
  
}catch(err){
    res.status(404).send(err.message)
}
}


const updateTour=async(req,res)=>{
    const Id=req.params.id
    const payload=req.body
    try{
        await Tour.findByIdAndUpdate({_id:Id},payload)
        res.send("updated")
    }catch(err){
        res.send(err.message)
    }
}


const deleteTour=async(req,res)=>{
    const Id=req.params.id

    try{
        await Tour.findByIdAndDelete({_id:Id})
        res.send("deleted")
    }catch(err){
        res.send(err.message)
    }
}


module.exports={getTour,createTour,updateTour,deleteTour,aliasTopTours,getTourStats,getTourMonthly}
