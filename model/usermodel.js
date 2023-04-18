const mongoose=require("mongoose")
const validator=require('validator')

const userSchema= mongoose.Schema({


    name:{type:String,required:true},
    email:{type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please Provide a valid email']},
    photo:String,
    password:{type:String,
        required:true,
        minlength:8},
    passwordConfirm:{type:String,required:true}
})

const User=mongoose.model('user',userSchema)
module.exports=User