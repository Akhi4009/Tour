const fs = require("fs")
const mongoose = require("mongoose")

require('dotenv').config()

const Tour=require("../../model/tourmodel")

mongoose.connect(process.env.url)
.then(()=>console.log("DB connection successfull"))

//read file
const tours =JSON.parse(fs.readFileSync(`${__dirname}/tours.json`,'utf-8'))

// import data into DB

const importData = async() => {
    try{
        await Tour.create(tours)
        console.log("Data successfully loaded")

    }catch(err){
        console.log(err)
    }
    process.exit()
}



const delteData = async () =>{

    try{
        await Tour.deleteMany()
        console.log("Data successfully deleted")

    }catch(err){
        console.log(err)
    }
    process.exit()
} 

if(process.argv[2]==='--import'){
    importData()
}else if (process.argv[2]==='--delete'){
    delteData()
}

