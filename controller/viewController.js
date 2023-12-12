const Tour =require("../model/tourmodel")
const catchAsync=require("../utlits/catchAsync")

const getOverview=catchAsync(async(req,res,next)=>{
   
    // Get Tour data from collection
    const tours = await Tour.find()
    

    // Build template

    // render that template using tou data
    res.status(200).render('overview',{
        title:'All Tours',
        tours
    })
    next()
});

const getTour=((req,res)=>{
    res.status(200).render('tour',{
        title:'The Forest Hiker tour'
    });
})




module.exports={getOverview,getTour}