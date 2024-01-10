const Tour =require("../model/tourmodel")
const catchAsync=require("../utlits/catchAsync")


    const getOverview = catchAsync(async (req, res, next) => {
        try {
          // Get Tour data from the collection
          const tours = await Tour.find();
      
          // Render the template using tour data
          res.status(200).render('overview', {
            title: 'All Tours',
            tours
          });
      
          // Call next() after sending the response
          next();
        } catch (error) {
          // Handle errors appropriately (e.g., log them or send an error response)
          next(error);
        }
      });

const getTour=catchAsync(async(req,res)=>{

  const tour = await Tour.findOne({slug:req.params.slug}).populate({
    path:'reviews',
    fields:'review rating user'
  })
    res.status(200).render('tour',{
        title:'The Forest Hiker tour',
        tour
    });
})




module.exports={getOverview,getTour}