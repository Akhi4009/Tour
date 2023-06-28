const catchAsync = require("../utlits/catchAsync");
const AppError = require("../utlits/appError")
const APIFeatures=require("../utlits/apiFeature")


exports.deleteOne=Model=>catchAsync(async(req,res,next)=>{

    const doc= await Model.findByIdAndDelete(req.params.id)

    if(!doc){
        return next(new AppError("No document found with this ID",404));
    }

    res.status(204).json({
        status:"success",
        data:null
      })

})

exports.updateOne=Model=>catchAsync(async(req,res,next)=>{

    const doc= await Model.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    if(!doc){
     return next(new AppError('No document found with thisid',404))
 }
     res.status(200).json({
        status:"success",
        data:{
            data:doc
        }

     })
})

exports.createOne=Model=>catchAsync(async(req,res,next)=>{

    const doc=new Model(req.body)
    await doc.save()


    res.status(201).send({
        status:'success',
        data:{
            data:doc
        }
    })

})

exports.getOne=(Model,popoption)=>catchAsync(async(req,res,next)=>{

    let query =  await Model.findById(req.params.id);
    if(popoption) query=query.populate(popoption)

    
    const doc= await query
    
    
    if(!doc){
        return next(new AppError('No Document found with this id',404))
    }

    if(doc.reviews){
        res.status(200).json({
        status:'success',
        data:{
            data:doc,
            review:doc.reviews
        }
    })
}else{
    res.status(200).json({
        status:'success',
        data:{
            data:doc
        }
    })
    }
   

})

exports.getAll=Model=>catchAsync (async(req,res,next)=>{
    
    let filter={};
    if(req.params.tourId) filter = {tour:req.params.tourId}
    //execution
        const features=new APIFeatures(Model.find(filter),req.query)
        .filter()
        .sort()
        .LimitFields()
        .Pagination()
  
    //   const doc=await features.query.explain()
      const doc=await features.query
          res.status(200).send({
            status:true,
            result:doc.length,
            data:doc})
        })

