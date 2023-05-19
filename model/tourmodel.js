const mongoose=require("mongoose")

const tourScema=mongoose.Schema({
    "name":{type:String,required:true},
    "price":{type:Number,required:true},
    "duration":{type:Number,required:true},
   
    "maxGroupSize":{type:Number,required:true},
    "difficulty":{type:String,required:true},
    "ratingsAverage":{type:Number,default:4.5},
    "ratingsQuantity":{type:Number,default:0},
    "priceDiscount":{type:Number},
    "summary":{type:String,trim:true,required:true},
    "description":{type:String,trim:true},
    "imageCover":{type:String,required:true},
    "images":[String],
    createdAt:{
        type:Date,
        default:Date.now()
    },
    startDates:[Date],
    secretTour:{
        type:Boolean,
        default:false
    },
    startLocation: {
        //GeoJSON
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinate: [Number],
        address: String,
        description: String
    },
    Location: [
    {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinate: [Number],
        address: String,
        description: String,
        day: Number
    }
    ],
    guides:Array

},{
    versionKey:false
})
const Tour=mongoose.model("tour",tourScema)


module.exports=Tour