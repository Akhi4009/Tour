

const getOverview=((req,res)=>{
    res.status(200).render('overview',{
        title:'All Tours'
    });
});

const getTour=((req,res)=>{
    res.status(200).render('tour',{
        title:'The Forest Hiker tour'
    });
})

module.exports={getOverview,getTour}