const mongoose=require("mongoose")
const validator=require('validator')
const bcrypt=require("bcrypt")
const crypto=require("crypto")

const userSchema= mongoose.Schema({


    name:{type:String,required:true},
    email:{type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please Provide a valid email']},
    photo:String,
    role:{
        type:String,
       enum:['user', 'guide', 'lead-guide', 'admin'],
       default:"user"
    
    },
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
    },
    passwordChangedAt: Date,
    passwordResetToken:String,
    passwordResetExpires:Date
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()

    this.password=await bcrypt.hash(this.password,12)
    this.passwordConfirm=undefined
})

userSchema.pre('save',function(next){
    if(!this.isModified('password') || this.isNew) return next()

    this.passwordChangedAt=Date.now()-1000
    next()
})

userSchema.methods.correctPassword=async function(candidatePassword,userPassword){

    return await bcrypt.compare(candidatePassword,userPassword)
}

userSchema.methods.changedPassword=function(jwtTimestamp){

   
    if(this.passwordChangedAt){
        const changedTimestamp=parseInt(this.passwordChangedAt.getTime()/1000,10)

        return jwtTimestamp < changedTimestamp
    }

    return false
}

userSchema.methods.createPasswordResetToken=function(){
    const resetToken=crypto.randomBytes(32).toString('hex')

    this.passwordResetToken=crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

    this.passwordResetExpires=Date.now() + 10*60*1000
    return resetToken
}

const User=mongoose.model('user',userSchema)
module.exports=User