const multer = require("multer");
const sharp = require("sharp");
const Tour = require('../model/tourmodel')
const APIFeatures = require("../utlits/apiFeature")
const catchAsync = require("../utlits/catchAsync")
const AppError = require("../utlits/appError")
const factory=require("../controller/handlerFactory")
const { Model } = require('mongoose')

const multerStorage =multer.memoryStorage();

const multerFilter = (req,file,cb)=>{
if(file.mimetype.startsWith('image')){
    cb(null,true)
}else{
    cb(new AppError('Not an image! Please upload only images.',400),false)
}
};

const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter
})

const uploadTourImages = upload.fields([
    {name: 'imageCover',maxCount:1},
    {name:'images',maxCount:3}
])

const resizeTourImages = catchAsync(async(req,res,next)=>{
   
    if(!req.files.imageCover ||!req.files.images) return next();
    
    // Cover Image
    req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
   
    await sharp(req.files.imageCover[0].buffer)
    .resize(2000,1300)
    .toFormat('jpeg')
    .jpeg({quality:90})
    .toFile(`Tour/public/img/tours/${req.body.imageCover}`);

    // images
    req.body.images =[];
   await Promise.all(req.files.images.map(async(file,i)=>{
    const fileName = `tour-${req.params.id}-${Date.now()}-${i+1}.jpeg`;

    await sharp(file.buffer)
    .resize(2000,1300)
    .toFormat('jpeg')
    .jpeg({quality:90})
    .toFile(`Tour/public/img/tours/${fileName}`);
    
    req.body.images.push(fileName);
  }))
  
    next();
})


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
const getTourByID = factory.getOne(Tour,["reviews", "guides"] );
const updateTour=factory.updateOne(Tour)
const deleteTour= factory.deleteOne(Tour)




module.exports={
    getTour,createTour,updateTour,
    deleteTour,aliasTopTours,
    getTourStats,getTourMonthly,
    getTourByID,uploadTourImages,
    resizeTourImages
}
