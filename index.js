const express=require("express")

const { connection } = require("./db")

require('dotenv').config()
const app=express()
app.use(express.json())
const tourRouter=require("./routes/tour.routes")

app.get('/',(req,res)=>{
    res.send("Welcome!")
})

app.use("/tours",tourRouter)


app.listen(4500,async()=>{
try{
    await connection
    console.log("connected to db")
}catch(err){
    console.log({"msg":"not connected to db","error":err.message})
}
console.log('server is running in port 4500');

})