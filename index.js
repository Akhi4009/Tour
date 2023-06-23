const express=require("express")
const rateLimit=require("express-rate-limit")

const { connection } = require("./db")
const AppError=require("./utlits/appError")
const globalErrorHandle=require("./controller/errorController")

const tourRouter=require("./routes/tour.routes")
const userRouter =require("./routes/user.routes")
require('dotenv').config()
const app=express()

const limiter=rateLimit({
    max:100,
    windowMs: 60 * 60 * 1000,
    message: 'Toomany request from this ip, please try again in an hour'
})

app.use('/',limiter)
app.use(express.json())



app.get('/',(req,res)=>{
    res.send("Welcome!")
})

app.use("/tours",tourRouter)
app.use("/users",userRouter)

app.all('*',(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server`,404))

})


app.use(globalErrorHandle)


app.listen(4500,async()=>{
try{
    await connection
    console.log("connected to db")
}catch(err){
    console.log({"msg":"not connected to db","error":err.message})
}
console.log('server is running in port 4500');

})