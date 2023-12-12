const express= require("express")

const router= express.Router();
const {getOverview,getTour}=require("../controller/viewController")

// base route



// overview route


router.get('/',getOverview);


// tour route


router.get('/tour',getTour)

module.exports=router