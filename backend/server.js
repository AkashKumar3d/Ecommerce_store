let app=require("./app.js")
const dotenv = require("dotenv");
const cloudinary=require("cloudinary")
const connectDatabase = require("./config/database.js");
const express = require('express')
//  app = express();
// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


//  handle uncaught exception
process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.messgae}`)
    console.log("sutting doun  the server  due to unhandled uncaught exception")

    process.exit(1)

})

// dotenv
dotenv.config({path:"backend/config/config.env"})

// connecting to database 
connectDatabase()

// cloudinary.config({
//     cloud_name:process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_API_SECRET
    
// })
 const server=app.listen(process.env.PORT, ()=>{
    // console.log(`lisning port on http://localhost:${process.env.PORT}` )
    console.log('server is running')
})





// unhandle promse rejection 
process.on("unhandledRejection", (err)=>{
    console.log(`Error : ${err.messgae}`)
    console.log("sutting doun  the server  due to unhandled promise rejection")

    server.close(()=>{
        process.exit(1)
    })
})

