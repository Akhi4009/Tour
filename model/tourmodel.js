const mongoose=require("mongoose")

const tourSchema=mongoose.Schema({
    "name":{type:String,required:true,trim:true},
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
        coordinates: [Number],
        address: String,
        description: String
    },
    locations: [
    {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number
    }
    ],
    guides:[
        {
        type:mongoose.Schema.ObjectId,
        ref: 'User'

        }

    ],
    


},{
    versionKey:false
},

    {
        toJSON: {virtuals: true},
        toObject:{virtuals: true}

    }
    )


tourSchema.index({price:1, ratingsAverage: 1})

//virtual populate
tourSchema.virtual('durationweeks').get(function(){
    return this.duration/7
})
    tourSchema.virtual('reviews', {
        ref:'Review',
        foreignField:'tour',
        localField:'_id'
    });

    // Documents middleware runs before .save() and .create()
const Tour=mongoose.model("Tour",tourSchema)


module.exports=Tour