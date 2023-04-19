const mongoose=require("mongoose")
const validator=require('validator')
const bcrypt=require("bcrypt")

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
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:true,
        validate: {
            validator: function(el) {
                return el===this.password
            },
            message: 'Password are not the same'
        }
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()

    this.password=await bcrypt.hash(this.password,12)
    this.passwordConfirm=undefined
})

userSchema.methods.correctPassword=async function(candidatePassword,userPassword){

    return await bcrypt.compare(candidatePassword,userPassword)
}

const User=mongoose.model('user',userSchema)
module.exports=User